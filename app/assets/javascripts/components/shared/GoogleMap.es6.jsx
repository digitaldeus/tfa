class GoogleMap extends React.Component {

  constructor(props) {
    super(props);
    this.bounds = null;
    this.markers = [];
    this.uniq = getUniqId();
  }

  componentDidMount() {
    const options = {
      zoom: 15,
      center: new google.maps.LatLng(this.props.lat, this.props.lng)
    }

    this.map = new google.maps.Map(document.getElementById("google-map" + this.uniq), options);
    this.infoWindow = new google.maps.InfoWindow();
  }

  componentDidUpdate() {
    this._updateMap();
  }

  _updateMap() {
    this._clearMarkers();
    this._clearBounds();

    this.props.markers.forEach((entry, index) => this._createMarker(entry, index));

    this.map.fitBounds(this.bounds);
    this.map.setCenter(this.bounds.getCenter());
  }

  _clearMarkers() {
    this.markers.forEach(m => {
      m.setMap(null);
    })
    this.markers = [];
  }

  _clearBounds() {
    this.bounds = new google.maps.LatLngBounds();
  }

  _createMarker(markerData, index) {
    const infoWindow = this.infoWindow;
    const map = this.map;
    const location = new google.maps.LatLng(markerData.lat, markerData.lng);
    const description = this._getInfoWindowContent(markerData, index);
    const marker = new MarkerWithLabel ({
      map: map,
      position: location,
      icon: this._getPin(),
      labelContent: this._getMarkerLabel(markerData),
      label: ' ',
      labelAnchor: new google.maps.Point(15, 30),
      labelClass: "google-map-marker-label",
      labelInBackground: false
    });

    this.bounds.extend(location);
    this.markers.push(marker);

    if(desciption){
      marker.addListener("click", () => {
        infoWindow.setContent(desciption);
        infoWindow.open(map, marker);
      })
    }
  }

  _getMarkerLabel(marker) {
    return "";
  }

  _getInfoWindowContent(marker, index) {
    return false;
  }

  _getPin(){
    return {
        path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
        fillColor: '#F78519',
        fillOpacity: 1,
        strokeColor: '#C45200',
        strokeWeight: 1,
        scale: 0.7
    };
  }

  render() {

    return (
      <div 
        id={"google-map"+this.uniq}
        className="google-map"
      />
    );
  }

}