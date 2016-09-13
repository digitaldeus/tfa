class EstablishmentPhotosC extends React.Component {

  static getStores() {
    return [AppEstablishmentStore];
  }

  static calculateState() {
    return AppEstablishmentStore.getState();
  }

  addPhoto(presigned, data) {
    const key = $(data.jqXHR.responseXML).find('Key').text(),
      url = '//' + presigned.host + '/' + key;

    EstablishmentActions.addPhoto(this.state.establishment.id, url);
  }

  deletePhoto(photoId) {
    EstablishmentActions.deletePhoto(this.state.establishment.id, photoId);
  }

  render() {
    return (
      <div className="establishment-photos-container">
        <EstablishmentPhotos
          uploadCallback={this.addPhoto.bind(this)}
          deleteCallback={this.deletePhoto.bind(this)}
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
            doneCallback={this.props.uploadCallback}/>
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
            photos={this.props.photos}
            deleteCallback={this.props.deleteCallback}/>
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

  openGalleryAt(index) {
    const el = document.querySelectorAll('.pswp')[0],
      photos = this.props.photos || [],
      items = photos
        .filter(photo => photo.processed)
        .map(photo => {
          return {
            src: photo.large,
            w: photo.width,
            h: photo.height
          }
        });

    if(items.length){
      let photoswipe = new PhotoSwipe(el, PhotoSwipeUI_Default, items, {
        index: index,
        history: false,
        barsSize: {top:44, bottom:0},
        captionEl: false,
        fullscreenEl: false,
        shareEl: false,
        bgOpacity: 0.85,
        tapToClose: true,
        tapToToggleControls: false
      });

      photoswipe.init();
      window.ps = photoswipe;
    }
  }

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
          <img src={src}
            width="100%"
            onClick={this.openGalleryAt.bind(this, index)}/>
          <i className="fa fa-times establishment-photos-remove"
            onClick={e => this.props.deleteCallback(photo.id)}></i>
        </div>
      );
    });

    return (
      <div>
        <div className="pswp" tabindex="-1" role="dialog" aria-hidden="true">
          <div className="pswp__bg"></div>
          <div className="pswp__scroll-wrap">
            <div className="pswp__container">
              <div className="pswp__item"></div>
              <div className="pswp__item"></div>
              <div className="pswp__item"></div>
            </div>
            <div className="pswp__ui pswp__ui--hidden">
              <div className="pswp__top-bar">
                <div className="pswp__counter"></div>
                <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>
                <button className="pswp__button pswp__button--share" title="Share"></button>
                <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                <div className="pswp__preloader">
                  <div className="pswp__preloader__icn">
                    <div className="pswp__preloader__cut">
                      <div className="pswp__preloader__donut"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div className="pswp__share-tooltip"></div> 
              </div>

              <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
              </button>

              <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
              </button>

              <div className="pswp__caption">
                <div className="pswp__caption__center"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row establishment-photos-gallery-row">
          {items}
        </div>
      </div>
    );
  }
}

const EstablishmentPhotosContainer = FluxUtils.Container.create(EstablishmentPhotosC);