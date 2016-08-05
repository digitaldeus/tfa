const EstablishmentAPI = {

  update: function(establishment){
    establishment.authenticity_token = EstablishmentAPI.authenticityToken

    fetch(`/establishments/${establishment.id}`, {
      method: 'PATCH',
      body: JSON.stringify(establishment),
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