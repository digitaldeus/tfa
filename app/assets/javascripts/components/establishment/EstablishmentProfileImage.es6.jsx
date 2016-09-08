class EstablishmentProfileImageC extends React.Component {
  static getStores() {
    return [AppEstablishmentStore];
  }

  static calculateState() {
    return AppEstablishmentStore.getState();
  }

  uploadDone(presigned, data) {
    const key = $(data.jqXHR.responseXML).find('Key').text(),
      url = '//' + presigned.host + '/' + key;

    EstablishmentActions.updateProfileImage(this.state.establishment.id, url);
  }

  render() {
    return (
      <div className="establishment-profile-image-container">
        <EstablishmentProfileImage
          profileImage={this.state.establishment.profile_image}/>
        <ProfileImageUpload
          doneCallback={this.uploadDone.bind(this)}
          title="Profile image upload"/>
      </div>
    );
  }
}

class EstablishmentProfileImage extends React.Component {

  render() {
    let imageSrc = "https://placeholdit.imgix.net/~text?txtsize=25&bg=dddddd&txt=Loading+Image&w=256&h=256";

    if( getChild(this.props, 'profileImage.processed')){
      imageSrc = this.props.profileImage.medium
    }

    let profileImageCl = classNames({
      "masked": this.props.uploadInProgress
    });

    let progressBarCl = classNames({
      "profile-image-progress-bar progress": true,
      "hidden": !this.props.uploadInProgress
    });

    return (
      <div>
        <div className="profile-image">
          <img className={profileImageCl} src={imageSrc} />
        </div>
        <div className={progressBarCl}>
          <div className="progress-meter"
            style={ { width: `${this.props.uploadProgress}%` } }>
          </div>
        </div>
      </div>
    );
  }
}


const EstablishmentProfileImageContainer = FluxUtils.Container.create(EstablishmentProfileImageC);