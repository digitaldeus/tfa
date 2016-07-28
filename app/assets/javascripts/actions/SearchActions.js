var SearchActions = {

  showLocationPredictions: function() {
    dispatch({
      type: 'DO_LOCATION_SEARCH'
    });
  },

  searchLocations: function(input) {
    dispatch({
      type: 'DO_LOCATION_SEARCH',
      input: input
    });
  },

  hideLocationPredictions() {
    dispatch({
      type: 'HIDE_LOCATION_SEARCH'
    });
  },

  selectLocation(location) {
    dispatch({
      type: 'SELECT_LOCATION',
      location: location
    });
  },

  searchChurch(input) {
    dispatch({
      type: 'DO_CHURCH_SEARCH',
      input: input
    });
  },

  hideChurchPredictions() {
    dispatch({
      type: 'HIDE_CHURCH_SEARCH'
    });
  },

  selectChurch(church) {
    dispatch({
      type: 'SELECT_CHURCH',
      church: church
    });
  },

  setLocation(locObj) {
    dispatch({
      type: 'SET_LOCATION',
      ...locObj
    });
  },

  getChurches() {
    dispatch({
      type: 'GET_CHURCHES'
    });
  },

  setChurchInput(church) {
    dispatch({
      type: 'SET_CHURCH_INPUT',
      church: church
    });
  }

}