const UserAPI = {

  updateUserProfile: (user_profile) => {
    BaseAPI.fetch(`/user_profiles/${user_profile.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ user_profile })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      UserActions.setUserProfile(json);
    });
  }

}