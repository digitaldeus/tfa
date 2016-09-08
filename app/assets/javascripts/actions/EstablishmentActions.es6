var EstablishmentActions = {

  getEstablishment: function(establishment) {
    EstablishmentAPI.get(establishment);
  },

  updateEstablishment: function(establishment) {    
    EstablishmentAPI.update(establishment);
  },

  setEstablishment: function(establishment) {

    dispatch({
      type: 'SET_ESTABLISHMENT',
      establishment: establishment
    });
  },

  updateServiceTimes: function(est, serviceTimes) {
    const establishment = {
      id: est.id,
      service_times_attributes: [serviceTimes]
    }

    EstablishmentActions.updateEstablishment(establishment);
  },

  updateProfileImage: function(establishmentId, url) {
    const establishment = {
      id: establishmentId,
      profile_image_attributes: {
        url: url
      }
    };

    EstablishmentActions.updateEstablishment(establishment);
  },

  updateBannerImage: function(establishmentId, url) {
    const establishment = {
      id: establishmentId,
      banner_image_attributes: {
        url: url
      }
    };

    EstablishmentActions.updateEstablishment(establishment);
  },

  addPhoto: function(establishmentId, url) {
    const establishment = {
      id: establishmentId,
      new_photo_url: url
    };

    dispatch({
      type: 'ADD_UPLOADER',
    });

    EstablishmentActions.updateEstablishment(establishment);
  }
}