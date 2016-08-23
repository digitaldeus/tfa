var UserActions = {

  updateUser: function(user){
    dispatch({
      type: 'REQUEST_USER_UPDATE'
    });

    UserAPI.update(user);
  },

  setUser: function(user){
    dispatch({
      type: 'SET_USER',
      user: user
    });
  }
}