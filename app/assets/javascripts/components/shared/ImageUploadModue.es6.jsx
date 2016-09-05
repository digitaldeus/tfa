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

    console.log(progress);
  }

  uploadDone(e, data) {
    this.setState({
      isUploading: false,
      isDone: true
    });

    this.props.doneCallback(this.state.presigned, data);

    console.log('upload done');
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

    let doneSignCl = classNames({
      "hidden": !this.state.isDone
    });

    return (
      <div className="image-upload-module">
        <div className="row align-middle">
          <div className="columns text-center image-upload-box">
            <input
              className={inputCl}
              type="file"
              onChange={this.getPresigned.bind(this)}
              ref={(c) => this.$input = $(c)}/>
            <div className={progressBarCl}>
              <div className="progress-meter"
                style={ { width: `${this.state.uploadProgress}%` } }>
              </div>
            </div>
            <div className={doneSignCl}>
              Done!
            </div>
          </div>
        </div>
      </div>
    );
  }
}