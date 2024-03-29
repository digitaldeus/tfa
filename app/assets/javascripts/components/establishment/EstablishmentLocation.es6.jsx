class EstablishmentLocation extends React.Component {

  static getStores() {
    return [AppEstablishmentStore];
  }

  static calculateState() {
    return AppEstablishmentStore.getState();
  }

  onAttributeChange(key, value){
    const data = { id: this.state.establishment.id };
    data[key] = value;
    EstablishmentActions.updateEstablishment(data);
  }

  render() {
    return (
      <div className="location-input-container">
        <EstablishmentLocationInput
          value={ getChild(this, "state.establishment.location.address") }
          attrKey="location"
          locationId={ getChild(this, "state.establishment.location.id") }
          onAttributeChange={this.onAttributeChange.bind(this)}
          mode="show"
        />
      </div>
    );
  }

}

class EstablishmentLocationInput extends EditableInput {

  componentDidMount() {
    this._autocomplete = new google.maps.places.Autocomplete(this._input);

    this._autocomplete.addListener('place_changed', () => {
      const place = this._autocomplete.getPlace();
      this.setState({ value: place.vicinity })
      this.inputSuccess();
    });
  }

  inputSuccess(e) {
    const place = this._autocomplete.getPlace(),
      location = {
        address: place.vicinity,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        place_id: place.place_id
      };

    if(this.props.locationId){
      location.id = this.props.locationId;
    }

    this.setState({ mode: "show" });
    this.props.onAttributeChange("location_attributes", location);
  }

  render() {
    const labelCl = classNames({
      "hidden": this.state.mode != "show"
    });
    const inputCl = classNames({
      "hidden": this.state.mode == "show"
    });
    const pencilCl = classNames({
      "ci ci-edit": true,
      "hidden": this.state.mode == "edit"
    });
    return (
      <div>
        <div className={labelCl}>
          {this.state.value}
        </div>
        <div className={inputCl}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.inputChange.bind(this)}
            onBlur={this.inputCancel.bind(this)}
            ref={(c) => this._input = c}/>
        </div>

        <i 
          className={pencilCl}
          onClick={this.pencilClick.bind(this)}/>
      </div>
    );
  }
}

const EstablishmentLocationContainer = FluxUtils.Container.create(EstablishmentLocation);