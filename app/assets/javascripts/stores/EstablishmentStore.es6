class EstablishmentStore extends FluxUtils.ReduceStore {

  getInitialState(){
    return {
      isUpdating: false,
      establishment: {}
    };
  }

  reduce(state, action){
    switch(action.type){
      case 'ESTABLISHMENT_UPDATE_REQUESTED':
        return Object.assign({}, state, {
          isUpdating: true
        });
      case 'SET_ESTABLISHMENT':
        return Object.assign({}, state, {
          isUpdating: false,
          establishment: action.establishment
        });
      // Action emitted on turbolinks if this store has
      // been included in gon.stores
      case 'GON_APPESTABLISHMENTSTORE':
        return Object.assign({}, state, {
          establishment: action.data
        });
      default:
        return state;
    }
  }
}

const AppEstablishmentStore = new EstablishmentStore(TFADispatcher)