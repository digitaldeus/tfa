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
      case 'ESTABLISHMENT_UPDATE_RECEIVED':
        return Object.assign({}, state, {
          isUpdating: false,
          establishment: action.establishment
        });
      default:
        return state;
    }
  }
}

const AppEstablishmentStore = new EstablishmentStore(TFADispatcher)