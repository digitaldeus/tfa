class ImageUploadModule extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isPresigning: false,
      isUploading: false,
      isDone: false,
      presigned: null,
      uploadProgress: 0
    };
  }

  componentDidUpdate() {
    // We do have presigned and not yet uploading
    if(this.state.isUploading == false && 
        this.state.presigned !== null && 
        !this.state.isDone) {
      this.doUpload();
    }
  } 

  getPresigned() {
    this.setState({
      isPresigning: true,
    });

    ImageAPI.getPresignedC((presigned) => {
      this.setState({
        isPresigning: false,
        presigned: presigned
      });
    });
  }

  doUpload() {
    this.$input.fileupload({
      type: 'POST',
      paramName: 'file',
      dataType: 'XML',
      url: this.state.presigned.url,
      formData: this.state.presigned.fields,
      replaceFileInput: false,
      progressall: this.uploadProgressAll.bind(this),
      done: this.uploadDone.bind(this)
    })

    this.setState({
      isUploading: true,
    });
    this.$input.trigger('change');

  }

  uploadProgressAll(e, data) {
    const progress = parseInt(data.loaded / data.total * 100, 10);

    this.setState({
      uploadProgress: progress
    })
  }

  uploadDone(e, data) {
    this.setState({
      isUploading: false,
      isDone: true
    });

    // Set relative height of done sign
    const height = this.$doneContainer.height();
    this.$doneSign.css('font-size', `${height*2/3}px`)

    this.props.doneCallback(this.state.presigned, data);
  }

  onInputChange() {
    const files = this.$input.prop('files');
    if(files && files[0]){
      this.getPresigned();  

      // Show currently selected image
      const reader = new FileReader();

      reader.onload = (e) => {
        this.$preview.attr('src', e.target.result);
      }

      reader.readAsDataURL(files[0]);
    }
    
  }

  render() {
    let inputCl = classNames({
      "image-upload-file-input": true,
      "hidden": this.state.isUploading || this.state.isPresigning || this.state.isDone
    });

    let progressBarCl = classNames({
      "progress": true,
      "hidden": !this.state.isUploading && !this.state.isPresigning
    });

    let previewImgCl = classNames({
      "image-upload-preview": true,
      "hidden": !this.state.isUploading && !this.state.isPresigning && !this.state.isDone
    });

    let doneCl = classNames({
      "image-upload-done": true,
      "hidden": !this.state.isDone
    });

    return (
      <div className="image-upload-module">
        <div className="text-center image-upload-box">
          <input
            className={inputCl}
            type="file"
            onChange={this.onInputChange.bind(this)}
            ref={(c) => this.$input = $(c)}/>
          <div className={previewImgCl}>
            <span className="image-upload-preview-image-helper"></span>
            <img
              className="image-upload-preview-image"
              ref={(c) => this.$preview = $(c)}/>
          </div>
          <div className={progressBarCl}>
            <div className="progress-meter"
              style={ { width: `${this.state.uploadProgress}%` } }>
            </div>
          </div>
          <div 
            className={doneCl}
            ref={(c) => this.$doneContainer = $(c)}>
            <i 
              className="fa fa-check-circle-o image-upload-done-center"
              ref={(c) => this.$doneSign = $(c)}></i> 
          </div>
        </div>
      </div>
    );
  }
}