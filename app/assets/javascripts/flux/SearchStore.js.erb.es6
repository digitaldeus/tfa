/**
 * Compute distance between a given lat and long
 */
const distance = function (lat1, lon1, lat2, lon2) {
    const l1 = new google.maps.LatLng(lat1, lon1);
    const l2 = new google.maps.LatLng(lat2, lon2);
	return google.maps.geometry.spherical.computeDistanceBetween(l1, l2) * 0.000621371; // convert meters to miles
};

class SearchStore extends FluxUtils.ReduceStore {
	constructor(dispatcher) {
		super(dispatcher);

		this.updateLocationPredictions = _.debounce(this._updateLocationPredictions, 100, true);
		this.updateChurchPredictions = _.debounce(this._updateChurchPredictions, 100, true);
	}

	getInitialState() {
		const geoString = parseQueryString('loc');
		const church = parseQueryString('church');
		let lat = null, long = null;
		if (geoString && typeof geoString == 'string') {
			const geoArr = geoString.split(',');
			if ($.isNumeric(geoArr[0]) && $.isNumeric(geoArr[1])) {
				lat = Number(geoArr[0]);
				long = Number(geoArr[1]);
			}
		}

		return {
			churchInput: church || "",
			churchPredictions: [],
			locationInput: parseQueryString('locname') || "",
			locationPredictions: [],
			selectedChurch: null,
			selectedLocation: parseQueryString('loc'),
			currentLocation: null,
			lat: lat,
			lng: long,
			searchResults: [],
			searchPagination: {
				hasNextPage: false
			},
			registered: false,
			nextPageLoading: false
		};
	}

	reduce(state, action) {
		switch (action.type) {
			case 'DO_CHURCH_SEARCH':
				this.updateChurchPredictions(action.input);

				return Object.assign({}, state, {
					churchInput: action.input,
					searchResults: []
				});
			case 'CHURCH_SEARCH_RESULTS':
				return Object.assign({}, state, {
					churchPredictions: action.data
				});
			case 'CHURCH_SEARCH_ADD_RESULTS':
				return Object.assign({}, state, {
					searchPagination: action.pagination,
					searchResults: state.searchResults.concat(action.results),
					nextPageLoading: false
				});
			case 'DO_LOCATION_SEARCH':
				this.updateLocationPredictions(action.input);
				return Object.assign({}, state, {
					locationInput: action.input
				});
			case 'LOCATION_SEARCH_RESULTS':
				return Object.assign({}, state, {
					locationPredictions: action.data
				});
			case 'HIDE_LOCATION_SEARCH':
				return Object.assign({}, state, { locationPredictions: [] });
			case 'SET_LOCATION':
				return Object.assign({}, state, {
					lat: action.lat * 1,
					lng: action.lng * 1
				});
			case 'SELECT_LOCATION':
				this._getPlaceDetail(action.location.place_id, (location) => {
					// store the lat and lng
					dispatch({
						type: 'SET_LOCATION',
						lat: location.geometry.location.lat() * 1,
						lng: location.geometry.location.lng() * 1
					});
				});
				return Object.assign({}, state, {
					locationInput: action.location.description,
					locationPredictions: []
				});
			case 'SELECT_CHURCH':
				return Object.assign({}, state, {
					selectedChurch: action.church,
					churchInput: action.church.description,
					churchPredictions: []
				});
			case 'HIDE_CHURCH_SEARCH':
				return Object.assign({}, state, {
					churchPredictions: []
				});
			case 'GET_CHURCHES':
				this._getChurches(state.lat, state.lng);
				return state;
			case 'SET_CHURCH_INPUT':
				return Object.assign({}, state, {
					churchInput: action.church
				});
			case "LOAD_NEXT_PAGE":
				state.searchPagination.nextPage();
				return Object.assign({}, state, {
					nextPageLoading: true
				});
			default:
				console.warn('Got unknown action: ', action)
				return state;
		}
	}

	// private methods

	_getChurches(lat, lng) {
		const service = new google.maps.places.PlacesService(this._getDummyMap());
		const currentState = this.getState();

		// run the search
		service.nearbySearch({
			keyword: currentState.churchInput,
			type: 'church',
			location: { lat: lat * 1, lng: lng * 1 },
			radius: 8046,
			limit: 10
		}, (predictions, status, pagination) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				const results = predictions.map(l => {
					const lat1 = l.geometry.location.lat();
					const lng1 = l.geometry.location.lng();
					const lat2 = currentState.lat;
					const lng2 = currentState.lng;
					return {
						lat: l.geometry.location.lat(),
						lng: l.geometry.location.lng(),
						place_id: l.place_id,
						photo: l.photos ? l.photos[0].getUrl({ maxWidth: 600, maxHeight: 600 }) : '<%=asset_url("landing/church-no-image.png")%>',
						description: l.name,
						address: l.vicinity,
						distance: (distance(lat1, lng1, lat2, lng2)).toFixed(1)
					};
				});

				// console.log(results);
				// console.log(pagination);

				dispatch({type: 'CHURCH_SEARCH_ADD_RESULTS', results, pagination});
			}
			else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
				console.log('The were no results for your search');
			}
			else {
				console.log('issue with your search: ', status);
			}
		});
	}

	/**
	 * Use the given string to retrieve the location autocomplete data
	 * @param  {string} searchString
	 */
	_updateLocationPredictions(searchString) {
		if (searchString && typeof searchString === "string" && searchString.length > 1) {
			let predictions = [];
			// run the passed in autocomplete function
			const service = new google.maps.places.AutocompleteService();

			// run the search
			service.getPlacePredictions({
				input: searchString, types: ['(cities)']
			}, (predictions, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					dispatch({
						type: 'LOCATION_SEARCH_RESULTS',
						data: predictions.map(l => {
							const desc = l.terms.map(term => term.value);
							return {
								description: desc.splice(0, desc.length - 1).join(','),
								place_id: l.place_id
							};
						})
					});
				}
			});
		} else {
			// clear the predictions
			this.reduce(this.getState(), { type: 'HIDE_CHURCH_SEARCH' });
		}
	}

	/**
	 * dummy map to allow search to happen
	 */
	_getDummyMap() {
		if (!this.dummy_map) {
			this.dummy_map = new google.maps.Map(document.createElement('div'));
		}

		return this.dummy_map;
	}

	/**
	 * Get the place detail, run the given callback
	 * @param  {string} place_id
	 * @param  {function} callback
	 */
	_getPlaceDetail(place_id, callback) {
		const service = new google.maps.places.PlacesService(this._getDummyMap());
		service.getDetails({ placeId: place_id }, (place, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				callback(place);
			}
		});
	}

	_updateChurchPredictions(searchString) {
		if (searchString && typeof searchString === "string" && searchString.length > 1) {
			let predictions = [];
			// run the passed in autocomplete function
			const service = new google.maps.places.PlacesService(this._getDummyMap());
			const currentState = this.getState();

			// run the search
			service.nearbySearch({
				keyword: searchString,
				type: 'church',
				location: { lat: currentState.lat, lng: currentState.lng },
				radius: 8046,
			}, (predictions, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					dispatch({
						type: 'CHURCH_SEARCH_RESULTS',
						data: predictions.map(l => {
							const lat1 = l.geometry.location.lat();
							const lng1 = l.geometry.location.lng();
							const lat2 = currentState.lat;
							const lng2 = currentState.lng;
							return {
								lat: l.geometry.location.lat(),
								lng: l.geometry.location.lng(),
								place_id: l.place_id,
								photo: l.photos ? l.photos[0].getUrl({ maxWidth: 600, maxHeight: 600 }) : l.icon,
								description: l.name,
								address: l.vicinity,
								distance: (distance(lat1, lng1, lat2, lng2)).toFixed(3) + "mi"
							};
						}).slice(0, 10)
					});
				}
			});
		} else {
			// clear the predictions
			// TODO: hacky, need better way to do this
			this._state.churchPredictions = [];
		}
	}

	/**
	 * Get the current location predictions array
	 * @returns {Array} Array of the location predictions
	 */
	getLocationPredictions() {
		return this.getState().locationPredictions;
	}

	/**
	 * Get the current church predictions array
	 * @returns {Array} Array of the church predictions
	 */
	getChurchPredictions() {
		return this.getState().churchPredictions;
	}

	/**
	 * Determines is the store is in a valid church search state
	 * @returns {boolean} validity of the state
	 */
	churchSearchValid() {
		const curState = this.getState();
		return curState.selectedLocation || (curState.lat && curState.lng);
	}

	/**
	 * lat,lng
	 */
	getLocationString() {
		const curState = this.getState();
		return `${curState.lat},${curState.lng}`;
	}

	/**
	 * Get the current church search input
	 */
	getChurchInput() {
		const curState = this.getState();
		return curState.churchInput;
	}
}

const AppSearchStore = new SearchStore(TFADispatcher);
