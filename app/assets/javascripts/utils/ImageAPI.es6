const ImageAPI = {

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

