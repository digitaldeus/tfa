class EstablishmentMapCont extends React.Component {

  static getStores() {
    return [AppEstablishmentStore];
  }

  static calculateState() {
    return AppEstablishmentStore.getState();
  }

  render() {
    const lat = getChildStr(this, "state.establishment.location.latitude") || 0,
      lng = getChildStr(this, "state.establishment.location.longitude") || 0;
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

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.lat != this.props.lat &&
        nextProps.lng != this.props.lng);
  }

  _updateMap() {
    super._updateMap();

    google.maps.event.addListenerOnce(this.map, "idle", () => { 
      this.map.setZoom(15);
    });
  }
}

const EstablishmentMapContainer = FluxUtils.Container.create(EstablishmentMapCont);