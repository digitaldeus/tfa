class ProfileImageUpload extends React.Component {

  constructor(props) {
    super(props);
    this._uniqId = "reveal" + getUniqId();
    this.$reveal = null;
  }

  openReveal() {
    this.$reveal.foundation("open");
  }

  render() {
    return (
      <div>
        <div>
          <i className="ci ci-add-photo ci-32 image-change"
            onClick={this.openReveal.bind(this)}/>
        </div>

        <div className="reveal"
          id={this.uniqId}
          ref={(c) => this.$reveal = $(c)}
          data-reveal>
          <button className="close-button" type="button" data-close="">
            <span>&times;</span>
          </button>
          <h2>{this.props.title}</h2>
          <p class="lead">Please select image to upload(jpg, jpeg, png, gif).</p>
          <div className="profile-image-upload-box">
            <ImageUploadModule
              doneCallback={this.props.doneCallback}/>
          </div>
        </div>
      </div>
    );
  }
}