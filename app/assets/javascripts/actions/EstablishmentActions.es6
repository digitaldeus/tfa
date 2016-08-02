var EstablishmentActions = {

  update: function(establishment){
    dispatch({
      type: 'ESTABLISHMENT_UPDATE_REQUESTED'
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