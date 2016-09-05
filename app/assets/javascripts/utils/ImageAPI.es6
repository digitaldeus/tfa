const ImageAPI = {

  getPresigned: (callback) => {
    BaseAPI.fetch(`/images/presigned`, {
      method: 'GET'
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      ImageActions.setPresigned(json);
    });
  },

  getPresignedC: (callback) => {
    BaseAPI.fetch(`/images/presigned`, {
      method: 'GET'
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      callback(json);
    });
  },

}

