class ChurchListMap extends React.Component {

  constructor(props) {
    super(props);
    this.bounds = null;
    this.markers = [];
  }

  componentDidMount() {
    const options = {
      zoom: 15,
      center: new google.maps.LatLng(this.props.lat, this.props.lng)
    }

    this.map = new google.maps.Map(document.getElementById("place-search-map"), options);
    this.infoWindow = new google.maps.InfoWindow();

    // this._updateMap();
  }

  componentDidUpdate() {
    this._updateMap();
  }

  _updateMap() {
    this._clearMarkers();
    this._clearBounds();

    this.props.searchResults.forEach((result, index) => this._createMarker(result, index));

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

  _createMarker(place, index) {
    const infoWindow = this.infoWindow;
    const map = this.map;
    const location = new google.maps.LatLng(place.lat, place.lng);
    const marker = new MarkerWithLabel ({
      map: map,
      position: location,
      icon: this._getPin(),
      labelContent: (index + 1) + '',
      label: ' ',
      labelAnchor: new google.maps.Point(15, 30),
      labelClass: "google-map-marker-label",
      labelInBackground: false
    });

    this.bounds.extend(location);
    this.markers.push(marker);

    marker.addListener("click", () => {
      infoWindow.setContent(place.description);
      infoWindow.open(map, marker);
    })
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
      <div id="place-search-map"/>
    );
  }

}

class ChurchListMoreButton extends React.Component {

  render() {

    if(!this.props.searchPagination.hasNextPage){
      return null;
    }

    return (
      <div className="text-center">
        <a 
          className="button"
          disabled={ this.props.nextPageLoading }
          onClick={ this._onClick.bind(this) }
        >Load More</a>
      </div>
    );
  }

  _onClick() {
    dispatch({
      type: "LOAD_NEXT_PAGE"
    })
  }
}


class ChurchListItem extends React.Component {

  render() {
    const c = this.props.church;
    service = <a className="button hollow small church-register" href={`/establishments/new?place_id=${c.place_id}`}>Request Access</a>;
    if (c.registered) {
      let service = <span className="church-service-times"><span className="church-service-time">Sunday 9:00am</span>(Worship)</span>;
    }

    return (
      <div className="church-search-entry">
        <div className="church-thumbnail" style={{background: `url(${c.photo}) top center no-repeat`}}>
          <div className="church-index-number">{this.props.index + 1}</div>
          <img className="church-size" src={this.props.member_icon}/>
        </div>

        <div className="church-details">
          <div className="church-details-top clearfix">
            <div className="row">
              <div className="columns">
                <span className="church-name">{c.description}</span>
              </div>
              <div className="columns shrink church-distance">
                {c.distance} mi
              </div>
            </div>
          </div>

          <div className="church-details-mid">
            <div className="row">
              <div className={"columns church-description " + (c.registered ? "registered" : "unregistered") }>
                This church has not completed a profile. If you are a staff member & <br />
                would like to claim this profile, request access here.
              </div>
                
            </div>
          </div>

          <div className="church-details-bot">
            <div className="row">
              <div className="columns">
                <div className="church-address">{c.address}</div>
              </div>
              <div className="columns shrink">
                {service}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class PlaceSearchList extends React.Component {
  static getStores() {
    return [AppSearchStore];
  }

  static calculateState(prevState) {
    return AppSearchStore.getState();
  }

  componentDidMount() {
    // get the churches for this search
    TFADispatcher.getChurches();
  }

  render() {
    return (
      <div className="row align-center">
        <div className="place-search-list-container columns small-12 medium-8">
          <div className="place-search-list">
            {
              this.state.searchResults.map((c, index) => <ChurchListItem 
                                                          key={c.place_id}
                                                          church={c}
                                                          index={index}
                                                          {...this.props}/>)
            }
          </div>
          <div className="place-search-list-more-button-container">
            <ChurchListMoreButton
              searchPagination={this.state.searchPagination}
              nextPageLoading={this.state.nextPageLoading}/>
          </div>
        </div>
        <div className="place-search-map-container columns small-12 medium-4">
          <ChurchListMap
            searchResults={this.state.searchResults}
            lat={this.state.lat}
            lng={this.state.lng}/>
        </div>
      </div>
    );
  }
}



const PlaceSearchListContainer = FluxUtils.Container.create(PlaceSearchList);
