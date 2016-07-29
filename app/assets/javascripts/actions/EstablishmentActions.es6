var EstablishmentActions = {

  update: function(establishment){
    dispatch({
      type: 'ESTABLISHMENT_UPDATE_REQUESTED'
    });

    EstablishmentAPI.update(establishment);
  },

  updateReceived: function(establishment){
    dispatch({
      type: 'ESTABLISHMENT_UPDATE_RECEIVED',
      establishment: establishment
    });
  }
}