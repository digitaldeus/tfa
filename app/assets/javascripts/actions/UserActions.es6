var UserActions = {

  requestUserUpdate: function(user) {
    dispatch({
      type: 'REQUEST_USER_UPDATE'
    });

    UserAPI.update(user);
  },

  requestUserProfileUpdate: function(userProfile) {
    dispatch({
      type: 'REQUEST_USER_UPDATE'
    });

    UserAPI.updateUserProfile(userProfile);
  },

  setUser: function(user) {
    dispatch({
      type: 'SET_USER',
      user: user
    });
  },

  setUserProfile: function(user_profile) {
    const user = { user_profile };

    dispatch({
      type: 'SET_USER',
      user
    });
  }
}