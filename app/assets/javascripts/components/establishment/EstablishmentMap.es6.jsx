class EstablishmentMapCont extends React.Component {

  static getStores() {
    return [AppEstablishmentStore];
  }

  static calculateState() {
    return AppEstablishmentStore.getState();
  }

  render() {
    const lat = getChildStr(this, "state.establishment.location.longitude") || 0,
      lng = getChildStr(this, "state.establishment.location.latitude") || 0;
    return (
      <EstablishmentMap
        lat={lat}
        lng={lng}
        markers={ [{ lat, lng }] }
      />
    );
  }
}

class EstablishmentMap extends GoogleMap {

}

const EstablishmentMapContainer = FluxUtils.Container.create(EstablishmentMapCont);