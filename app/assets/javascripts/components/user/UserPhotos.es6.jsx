class UserPhotosC extends React.Component {

  static getStores() {
    return [AppUserStore];
  }

  static calculateState() {
    return AppUserStore.getState();
  }

  addPhoto(presigned, data) {
    const key = $(data.jqXHR.responseXML).find('Key').text(),
      url = '//' + presigned.host + '/' + key;

    UserActions.addPhoto(this.state.user_profile.id, url);
  }

  deletePhoto(photoId) {
    UserActions.deletePhoto(this.state.user_profile.id, photoId);
  }

  render() {
    return (
      <div>
        <ProfilePhotos
          uploadCallback={this.addPhoto.bind(this)}
          deleteCallback={this.deletePhoto.bind(this)}
          uploaders={this.state.photoUploaders}
          photos={this.state.user_profile.photos}/>
      </div>
    );
  }
}

const UserPhotosContainer = FluxUtils.Container.create(UserPhotosC);