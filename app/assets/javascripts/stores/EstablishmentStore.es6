class EstablishmentStore extends FluxUtils.ReduceStore {

  getInitialState(){
    return {
      ui: {
        photoUploaders: 6,
      },
      imagesLoadTimeout: null,
      establishment: {}
    };
  }

  reduce(state, action){
    switch(action.type){
      case 'SET_ESTABLISHMENT':
        const establishment = Object.assign({}, state.establishment, action.establishment),
          photos = establishment.photos || [],
          photosLoading = photos.some((p) => !p.processed),
          profileImageLoading = !establishment.profile_image.processed,
          bannerImageLoading = !establishment.banner_image.processed;

        let imagesLoadTimeout = null;
        // In case establishment was received before timout
        clearTimeout(state.imagesLoadTimeout);

        // Are there some unprocessed images?
        if(photosLoading || profileImageLoading || bannerImageLoading){
          // Set 3 sec timout to load processing images
          imagesLoadTimeout = setTimeout(() => { EstablishmentActions.getEstablishment(establishment) }, 3000);
        }

        return Object.assign({}, state, {
          establishment: establishment,
          imagesLoadTimeout: imagesLoadTimeout
        });
      case 'ADD_UPLOADER':
        return Object.assign({}, state, {
          ui: {
            photoUploaders: state.ui.photoUploaders + 1
          }
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