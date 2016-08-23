const UserAPI = {

  update: (user) => {
    BaseAPI.fetch(`/users/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ user })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      UserActions.setUser(json);
    });
  }

}