var ImageActions = {

  requestPresigned: function(uploadType) {
    dispatch({
      type: 'REQUEST_PRESIGNED',
      uploadType: uploadType
    })

    ImageAPI.getPresigned();
  },

  setPresigned: function(presigned) {
    dispatch({
      type: 'SET_PRESIGNED',
      presigned: presigned
    });
  },

  clearPresigned: function(){
    dispatch({
      type: 'CLEAR_PRESIGNED'
    });
  },

  doUpload: function() {
    dispatch({
      type: 'DO_UPLOAD'
    });
  },

  doProgress: function(progress) {
    dispatch({
      type: 'DO_PROGRESS',
      progress: progress
    });
  },

}