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

        // Request again if there is no profile or banner image
        if(!establishment.profile_image || !establishment.banner_image){
          setTimeout(() => { EstablishmentActions.getEstablishment(establishment) }, 3000);
        }

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