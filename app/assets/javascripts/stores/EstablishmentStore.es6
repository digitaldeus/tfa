class EstablishmentStore extends FluxUtils.ReduceStore {

  getInitialState(){
    return {
      isUpdating: false,
      establishment: {}
    };
  }

  reduce(state, action){
    switch(action.type){
      case 'REQUEST_ESTABLISHMENT_UPDATE':
        return Object.assign({}, state, {
          isUpdating: true
        });
      case 'SET_ESTABLISHMENT':
        const establishment = Object.assign({}, state.establishment, action.establishment)
        return Object.assign({}, state, {
          isUpdating: false,
          establishment: establishment
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