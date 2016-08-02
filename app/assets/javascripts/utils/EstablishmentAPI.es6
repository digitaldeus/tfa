const EstablishmentAPI = {

  update: function(establishment){
    fetch('/establishments/${establishmen.id}', {
      method: 'PATCH',
      body: JSON.stringify(establishment),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': EstablishmentAPI.authenticityToken
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