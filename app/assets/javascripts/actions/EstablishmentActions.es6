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
  },

  updateServiceTimes: function(est, serviceTimes) {
    const establishment = {
      id: est.id,
      service_times_attributes: serviceTimes
    }

    EstablishmentActions.updateEstablishment(establishment);
  }
}