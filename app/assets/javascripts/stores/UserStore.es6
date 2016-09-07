class UserStore extends FluxUtils.ReduceStore {

  getInitialState(){
    return {
      isUpdating: false,
      user: {}
    };
  }

  reduce(state, action){
    switch(action.type){
      case 'REQUEST_USER_UPDATE':
        return Object.assign({}, state, {
          isUpdating: true
        });
      case 'SET_USER':
        const user = Object.assign({}, state.user, action.user);
        return Object.assign({}, state, {
          isUpdating: false,
          user: user
        });
      // Action emitted on turbolinks if this store has
      // been included in gon.stores
      case 'GON_APPUSERSTORE':
        return Object.assign({}, state, {
          user: action.data
        });
      default:
        return state;
    }
  }
}

const AppUserStore = new UserStore(TFADispatcher)