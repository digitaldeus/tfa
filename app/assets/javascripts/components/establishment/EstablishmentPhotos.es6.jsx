class EstablishmentPhotosC extends React.Component {

  static getStores() {
    return [AppEstablishmentStore];
  }

  static calculateState() {
    return AppEstablishmentStore.getState();
  }

  uploadDone(presigned, data) {
    const key = $(data.jqXHR.responseXML).find('Key').text(),
      url = '//' + presigned.host + '/' + key;

    EstablishmentActions.addPhoto(this.state.establishment.id, url);
  }

  render() {
    return (
      <div className="establishment-photos-container">
        <EstablishmentPhotos
          doneCallback={this.uploadDone.bind(this)}
          uploaders={this.state.ui.photoUploaders}
          photos={this.state.establishment.photos}/>
      </div>
    );
  }
}


class EstablishmentPhotos extends React.Component {
  constructor(props) {
    super(props);
    this._uniqId = "reveal" + getUniqId();
  }

  openReveal() {
    this.$reveal.foundation("open");
  }

  render() {
    let uploaders = [];

    for(let x = 0; x < this.props.uploaders; x++){
      uploaders.push(
        <div
          className="small-6 medium-4 columns establishment-photos-uploader-column"
          key={x}>
          <ImageUploadModule
            doneCallback={this.props.doneCallback}/>
        </div>
      );
    };

    return (
      <div>
        <div className="photos-header white-block-header clearfix">
          <div className="float-left">
            Photos
          </div>
          <div className="float-right">
            <i className="ci ci-plus ci-24 photos-add"
              onClick={this.openReveal.bind(this)}/>
          </div>
        </div>

        <div className="photos-gallery">
          <EstablishmentPhotosGallery
            photos={this.props.photos}/>
        </div>

        <div className="reveal"
          id={this.uniqId}
          ref={(c) => this.$reveal = $(c)}
          data-reveal>
          <button className="close-button" type="button" data-close="">
            <span>&times;</span>
          </button>
          <h2>Photos upload</h2>
          <p class="lead">Please select images to upload(jpg, jpeg, png, gif).</p>
          <div className="row">
            {uploaders}
          </div>
        </div>

      </div>
    );
  }
}

class EstablishmentPhotosGallery extends React.Component {

  render() {
    let photos = this.props.photos || [];


    let items = photos.map((photo, index) => {
      let src = "https://placeholdit.imgix.net/~text?txtsize=15&bg=dddddd&txt=Loading+Image&w=256&h=256"

      if(photo.processed){
        src = photo.medium;
      }

      return (
        <div className="small-4 columns establishment-photos-gallery-column"
          key={index}>
          <img src={src} width="100%"/>
        </div>
      );
    });

    return (
      <div className="row establishment-photos-gallery-row">
        {items}
      </div>
    );
  }
}

const EstablishmentPhotosContainer = FluxUtils.Container.create(EstablishmentPhotosC);