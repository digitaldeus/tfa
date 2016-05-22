import {ReduceStore} from 'flux/utils';
import AppDispatcher from './AppDispatcher';

class SearchStore extends ReduceStore {
  getInitialState() {
    return {
      searchPredictions: [],
      locationPredictions: [],
      selectedLocation: null,
      selectedPlace: null,
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case 'DO_CHURCH_SEARCH':
        return state;
      case 'CHURCH_SEARCH_RESULTS':
        return state;
      case 'DO_LOCATION_SEARCH':
        this._updateLocationPredictions(action.input);
        return state;
      case 'LOCATION_SEARCH_RESULTS':
        return state;
      case 'HIDE_LOCATION_SEARCH':
        return state;
      case 'HIDE_SEARCH_SEARCH':
        return state;
      case 'LOCATION_CLEAR_RESULTS':
        return Object.assign({}, state, {locationPredictions: []});
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
        input: input, types: ['(cities)']
      }, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {

          this.dispatcher.dispatch({
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
      this.dispatcher.dispatch({
        type: 'LOCATION_CLEAR_RESULTS'
      });
    }
  }
}

const instance = new SearchStore(AppDispatcher);
export default instance;