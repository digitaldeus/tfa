class UserBannerImageC extends React.Component {
  static getStores() {
    return [AppUserStore];
  }

  static calculateState() {
    return AppUserStore.getState();
  }

  uploadDone(presigned, data) {
    const key = $(data.jqXHR.responseXML).find('Key').text(),
      url = '//' + presigned.host + '/' + key;

    UserActions.createBannerImage(this.state.user_profile.id, url);
  }

  render() {
    return (
      <div className="establishment-banner-image-container">
        <UserBannerImage
          bannerImage={this.state.user_profile.banner_image}/>
        <ProfileImageUpload
          doneCallback={this.uploadDone.bind(this)}
          title="Banner image upload"/>
      </div>
    );
  }
}

class UserBannerImage extends React.Component {
  render() {
    let imageSrc = "https://placeholdit.imgix.net/~text?txtsize=25&bg=dddddd&txt=Loading+Image&w=1024&h=1024";

    if( getChild(this.props, 'bannerImage.processed') ){
      imageSrc = this.props.bannerImage.large;
    }

    return (
      <img className="banner-image" src={imageSrc} />
    );
  }
}


const UserBannerImageContainer = FluxUtils.Container.create(UserBannerImageC);