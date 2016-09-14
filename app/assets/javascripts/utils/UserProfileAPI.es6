const UserProfileAPI = {

  get: (userProfileId, body = {}, method = 'GET', action = '') => {
    BaseAPI.fetch(`/user_profiles/${userProfileId}/${action}`, {
      method: method,
      body: JSON.stringify( body )
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      UserActions.setUserProfile(json);
    });
  },
}