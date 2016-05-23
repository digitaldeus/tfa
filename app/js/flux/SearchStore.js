import {ReduceStore} from 'flux/utils';
import AppDispatcher, {dispatch} from './AppDispatcher';

const distance = function(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

class SearchStore extends ReduceStore {
  getInitialState() {
    return {
      churchInput: '',
      churchPredictions: [],
      locationInput: '',
      locationPredictions: [],
      selectedChurch: null,
      selectedLocation: null,
      currentLocation: null,
      lat: null,
      lng: null
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case 'DO_CHURCH_SEARCH':
        this._updateChurchPredictions(action.input);

        return Object.assign({}, state, {
          churchInput: action.input
        });
      case 'CHURCH_SEARCH_RESULTS':
        console.log(action);
        return Object.assign({}, state, {
          churchPredictions: action.data
        });
      case 'DO_LOCATION_SEARCH':
        this._updateLocationPredictions(action.input);
        return Object.assign({}, state, {
          locationInput: action.input
        });
      case 'LOCATION_SEARCH_RESULTS':
        return Object.assign({}, state, {
          locationPredictions: action.data
        });
      case 'HIDE_LOCATION_SEARCH':
        return Object.assign({}, state, { locationPredictions: [] });
      case 'SELECT_LOCATION':
        this._getPlaceDetail(action.location.place_id, (location) => {
          // store the lat and lng
          this.currentLat = location.geometry.location.lat();
          this.currentLng = location.geometry.location.lng();
          
          console.log(this.currentLat, this.currentLng);
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
          churchPredictions: state.churchPredictions
        });
      default:
        console.warn('Got unknown action: ', action)
        return state;
    }
  }

  // private methods


  /**
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
    service.getDetails({placeId: place_id}, (place, status) => {
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

      // run the search
      service.nearbySearch({
        keyword: searchString,
        type: 'church',
        location: {lat: this.currentLat, lng: this.currentLng},
        radius: 80500,
      }, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(predictions);
          dispatch({
            type: 'CHURCH_SEARCH_RESULTS',
            data: predictions.map(l => {
                const lat1 = l.geometry.location.lat();
                const lng1 = l.geometry.location.lng();
                const lat2 = this.getState().lat;
                const lng2 = this.getState().lng;
              return {
                lat: l.geometry.location.lat(),
                lng: l.geometry.location.lng(),
                place_id: l.place_id,
                photo: l.photos ? l.photos[0].getUrl({maxWidth: 600, maxHeight: 600}) : l.icon,
                description: l.name,
                address: l.vicinity,
                distance: (distance(lat1, lng1, lat2, lng2) * 0.00062137).toFixed(2) + "mi"
              };
            }).slice(0, 10)
          });
        }
      });
    } else {
      // clear the predictions
      this.reduce(this.getState(), { type: 'HIDE_LOCATION_SEARCH' });
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
}

const instance = new SearchStore(AppDispatcher);
export default instance;