class EstablishmentBannerImageC extends React.Component {
  static getStores() {
    return [AppEstablishmentStore, AppImageStore];
  }

  static calculateState() {
    return Object.assign({},
      AppEstablishmentStore.getState(),
      AppImageStore.getState());
  }

  uploadDone(presigned, data) {
    const key = $(data.jqXHR.responseXML).find('Key').text(),
      url = '//' + presigned.host + '/' + key;

    EstablishmentActions.updateBannerImage(this.state.establishment.id, url);
  }

  render() {
    return (
      <div className="establishment-banner-image-container">
        <EstablishmentBannerImage
          bannerImage={this.state.establishment.banner_image}/>
        <ProfileImageUpload
          doneCallback={this.uploadDone.bind(this)}
          title="Banner image upload"/>
      </div>
    );
  }
}

class EstablishmentBannerImage extends React.Component {
  render() {
    let imageSrc = "https://placeholdit.imgix.net/~text?txtsize=25&bg=dddddd&txt=Loading+Image&w=1024&h=1024";

    if(this.props.bannerImage && this.props.bannerImage.full){
      imageSrc = this.props.bannerImage.full;
    }

    if(this.props.bannerImage && this.props.bannerImage.large){
      imageSrc = this.props.bannerImage.large;
    }

    return (
      <img className="banner-image" src={imageSrc} />
    );
  }
}


const EstablishmentBannerImageContainer = FluxUtils.Container.create(EstablishmentBannerImageC);