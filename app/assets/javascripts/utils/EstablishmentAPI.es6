const EstablishmentAPI = {

  update: function(establishment){
    let data = {
      authenticity_token: EstablishmentAPI.authenticityToken,
      establishment: establishment
    };

    fetch(`/establishments/${establishment.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      EstablishmentActions.setEstablishment(json);
    }); 
  }

}

$(() => {
  EstablishmentAPI.authenticityToken = $("meta[name='csrf-token']").attr("content");
})