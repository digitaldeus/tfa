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
      <div>
        <ProfilePhotos
          uploadCallback={this.addPhoto.bind(this)}
          deleteCallback={this.deletePhoto.bind(this)}
          uploaders={this.state.ui.photoUploaders}
          photos={this.state.establishment.photos}/>
      </div>
    );
  }
}

const EstablishmentPhotosContainer = FluxUtils.Container.create(EstablishmentPhotosC);