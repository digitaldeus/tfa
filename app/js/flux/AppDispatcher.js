import {Dispatcher} from 'flux'

class AppDispatcher extends Dispatcher {
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
  
  showPlacePredictions() {
    this.dispatch({type: 'DO_CHURCH_SEARCH'});
  }
  
  hidePlacePredictions() {
    this.dispatch({type: 'HIDE_SEARCH_SEARCH'});
  }
}

const instance = new AppDispatcher();
export default instance;

// So we can conveniently do, `import {dispatch} from './AppDispatcher';`
export const dispatch = instance.dispatch.bind(instance);
