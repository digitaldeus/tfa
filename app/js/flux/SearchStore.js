import {ReduceStore} from 'flux/utils';
import AppDispatcher, {dispatch} from './AppDispatcher';

class SearchStore extends ReduceStore {
  getInitialState() {
    return {
      searchPredictions: [],
      locationPredictions: [],
      selectedLocation: null,
      locationInput: '',
      selectedPlace: null,
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case 'DO_CHURCH_SEARCH':
        return state;
      case 'CHURCH_SEARCH_RESULTS':
        return Object.assign({}, state, {
          locationPredictions: action.data
        });
      case 'DO_LOCATION_SEARCH':
        this._updateLocationPredictions(action.input);
        return Object.assign({}, state, {
          locationInput: action.input
        });
      case 'LOCATION_SEARCH_RESULTS':
        return state;
      case 'HIDE_LOCATION_SEARCH':
        return Object.assign({}, state, {locationPredictions: []});
      case 'SELECT_LOCATION':
        return Object.assign({}, state, {
          selectedLocation: action.location,
          locationInput: action.location.description,
          locationPredictions: []
        });
      case 'HIDE_SEARCH_SEARCH':
        return state;
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
            type: 'CHURCH_SEARCH_RESULTS',
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
      this.reduce(this.getState(), {type: 'HIDE_LOCATION_SEARCH'});
    }
  }
  
  /**
   * Get the current location predictions array
   * @returns {Array} Array of the location predictions 
   */
  getLocationPredictions() {
    return this.getState().locationPredictions;
  }
}

const instance = new SearchStore(AppDispatcher);
export default instance;