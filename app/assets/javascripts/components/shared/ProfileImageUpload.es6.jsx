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
          <i className="fa fa-picture-o image-change"
            onClick={this.openReveal.bind(this)}/>
        </div>

        <div className="reveal"
          id={this.uniqId}
          ref={(c) => this.$reveal = $(c)}
          data-reveal>
          <h2>{this.props.title}</h2>
          <p class="lead">Please select image to upload(jpg, jpeg, png, gif).</p>
          <ImageUploadModule
            doneCallback={this.props.doneCallback}/>
        </div>
      </div>
    );
  }
}