class ImageStore extends FluxUtils.ReduceStore {

  getInitialState(){
    return {
      isUploading: false,
      isPresigning: false,
      uploadProgress: 0,
      uploadType: "",
      presigned: null,
    };
  }

  reduce(state, action){
    switch(action.type){
      case 'REQUEST_PRESIGNED':
        return Object.assign({}, state, {
          isPresigning: true,
          uploadType: action.uploadType
        });
      case 'SET_PRESIGNED':
        return Object.assign({}, state, {
          isPresigning: false,
          presigned: action.presigned
        });
      case 'DO_UPLOAD':
        return Object.assign({}, state, {
          isUploading: true,
        });
      case 'DO_PROGRESS':
        return Object.assign({}, state, {
          uploadProgress: action.progress
        });
      case 'CLEAR_PRESIGNED':
        return Object.assign({}, state, {
          presigned: null
        });
      case 'CLEAR_STORE':
        return this.getInitialState();
      default:
        return state;
    }
  }
}

const AppImageStore = new ImageStore(TFADispatcher)