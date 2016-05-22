import Dispatcher from 'flux'

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
  
  hideLocationPredictios() {
    this.dispatch({type: 'HIDE_LOCATION_SEARCH'});
  }
  
  showPlacePredictions() {
    this.dispatch({type: 'DO_CHURCH_SEARCH'});
  }
  
  hidePlacePredictions() {
    this.dispatch({type: 'HIDE_SEARCH_SEARCH'});
  }
}

const instance = new AppDispatcher();
export const dispatch = instance.dispatch;
export default instance;