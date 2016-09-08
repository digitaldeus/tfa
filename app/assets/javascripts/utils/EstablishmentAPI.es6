const EstablishmentAPI = {

  update: (establishment) => {
    BaseAPI.fetch(`/establishments/${establishment.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ establishment })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      EstablishmentActions.setEstablishment(json);
    });
  },

  get: (establishment) => {
    BaseAPI.fetch(`/establishments/${establishment.id}`, {
      method: 'GET'
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      EstablishmentActions.setEstablishment(json);
    });
  },

}

