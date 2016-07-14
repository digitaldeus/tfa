class AppDispatcher extends Flux.Dispatcher {
	showLocationPredictions() {
		this.dispatch({type: 'DO_LOCATION_SEARCH'});
	}

	/**
	 * @param  {string} input
	 */
	searchLocations(input) {
		this.dispatch({type: 'DO_LOCATION_SEARCH', input});
	}

	hideLocationPredictions() {
		this.dispatch({type: 'HIDE_LOCATION_SEARCH'});
	}

	selectLocation(location) {
		this.dispatch({type: 'SELECT_LOCATION', location});
	}

	searchChurch(input) {
		this.dispatch({type: 'DO_CHURCH_SEARCH', input});
	}

	hideChurchPredictions() {
		this.dispatch({type: 'HIDE_CHURCH_SEARCH'});
	}

	selectChurch(church) {
		this.dispatch({type: 'SELECT_CHURCH', church});
	}

	setLocation(locObj) {
		this.dispatch(Object.assign({}, {type: 'SET_LOCATION'}, locObj));
	}

	getChurches() {
		this.dispatch({type: 'GET_CHURCHES'});
	}

	setChurchInput(church) {
		this.dispatch({type: 'SET_CHURCH_INPUT', church});
	}
}

window.TFADispatcher = new AppDispatcher();
window.dispatch = TFADispatcher.dispatch.bind(TFADispatcher);

const parseQueryString = function (variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return decodeURIComponent(pair[1]);
		}
	}

	return null;
};