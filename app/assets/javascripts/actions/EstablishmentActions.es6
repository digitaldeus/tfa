var EstablishmentActions = {

  updateEstablishment: function(establishment){
    dispatch({
      type: 'REQUEST_ESTABLISHMENT_UPDATE'
    });

    EstablishmentAPI.update(establishment);
  },

  setEstablishment: function(establishment){
    dispatch({
      type: 'SET_ESTABLISHMENT',
      establishment: establishment
    });
  }
}