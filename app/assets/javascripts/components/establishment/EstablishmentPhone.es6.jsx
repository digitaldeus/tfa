class EstablishmentPhone extends React.Component {

  static getStores() {
    return [AppEstablishmentStore];
  }

  static calculateState() {
    return AppEstablishmentStore.getState();
  }

  render() {
    return (
      <div className="establishment-phone-container">
        <EstablishmentPhoneInput
          value={this.state.establishment.phone}
        />
      </div>
    );
  }

}

class EstablishmentPhoneInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: (props.value || "") };
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value || "" });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}

const EstablishmentPhoneContainer = FluxUtils.Container.create(EstablishmentPhone);