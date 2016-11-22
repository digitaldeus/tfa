class UserProfileImageC extends React.Component {
  static getStores() {
    return [AppUserStore];
  }

  static calculateState() {
    return AppUserStore.getState();
  }

  uploadDone(presigned, data) {
    const key = $(data.jqXHR.responseXML).find('Key').text(),
      url = '//' + presigned.host + '/' + key;

    UserActions.createProfileImage(this.state.user_profile.id, url);
  }

  render() {
    return (
      <div className="establishment-profile-image-container">
        <UserProfileImage
          profileImage={this.state.user_profile.profile_image}/>
        <ProfileImageUpload
          doneCallback={this.uploadDone.bind(this)}
          title="Profile image upload"/>
      </div>
    );
  }
}

class UserProfileImage extends React.Component {

  render() {
    let imageSrc = "https://placeholdit.imgix.net/~text?txtsize=25&bg=dddddd&txt=Loading+Image&w=256&h=256";

    if( getChild(this.props, 'profileImage.processed')){
      imageSrc = this.props.profileImage.medium
    }

    return (
      <div className="profile-image">
        <img src={imageSrc} />
      </div>
    );
  }
}


const UserProfileImageContainer = FluxUtils.Container.create(UserProfileImageC);
