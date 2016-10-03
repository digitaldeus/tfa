class UserStore extends FluxUtils.ReduceStore {

  getInitialState(){
    return {
      photoUploaders: 6,
      isUpdating: false,
      imagesLoadTimeout: null,
      user_profile: {},
      user: {}
    };
  }

  reduce(state, action){
    switch(action.type){

      // This action should be used at the beginnign of every update
      // to enable showing loading status. Not used
      case 'REQUEST_USER_PROFILE_UPDATE':
        return Object.assign({}, state, {
          isUpdating: true
        });

      // Saves user profile to the store
      // If any of images of user profile does have processed set to
      // false we request for new user profile in 3 sec. This goes on
      // until all the images receive status processed
      case 'SET_USER_PROFILE':
        const user_profile = Object.assign({}, state.user_profile, action.user_profile),
          photos = user_profile.photos || [],
          photosLoading = photos.some((p) => !p.processed),
          profileImageLoading = !user_profile.profile_image.processed,
          bannerImageLoading = !user_profile.banner_image.processed;

        let imagesLoadTimeout = null;
        // In case establishment was received before timout
        clearTimeout(state.imagesLoadTimeout);

        // Are there some unprocessed images?
        if(photosLoading || profileImageLoading || bannerImageLoading){
          // Set 3 sec timout to load processing images
          imagesLoadTimeout = setTimeout(() => { UserActions.getUserProfile(user_profile.id) }, 3000);
        }

        return Object.assign({}, state, {
          isUpdating: false,
          user_profile: user_profile,
          imagesLoadTimeout: imagesLoadTimeout
        });

      // Add one uploader module to the photos upload window
      case 'ADD_UPLOADER':
        return Object.assign({}, state, { 
          photoUploaders: state.photoUploaders + 1
        });
        
      // Action emitted on turbolinks if this store has
      // been included in gon.stores
      case 'GON_APPUSERSTORE':
        return Object.assign({}, state, action.data);
      default:
        return state;
    }
  }
}

const AppUserStore = new UserStore(TFADispatcher)