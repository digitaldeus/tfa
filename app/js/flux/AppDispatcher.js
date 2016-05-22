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
  
  searchChurch(input) {
    this.dispatch({type: 'DO_CHURCH_SEARCH', input});
  }
  
  hideChurchPredictions() {
    this.dispatch({type: 'HIDE_CHURCH_SEARCH'});
  }
  
  selectChurch(church) {
    this.dispatch({type: 'SELECT_CHURCH', church});
  }
}

const instance = new AppDispatcher();
export default instance;

// So we can conveniently do, `import {dispatch} from './AppDispatcher';`
export const dispatch = instance.dispatch.bind(instance);
