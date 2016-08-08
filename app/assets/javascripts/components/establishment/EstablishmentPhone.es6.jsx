class EstablishmentPhone extends React.Component {

  static getStores() {
    return [AppEstablishmentStore];
  }

  static calculateState() {
    return AppEstablishmentStore.getState();
  }

  onPhoneChange(newPhone){
    EstablishmentActions.update({
      id: this.state.establishment.id,
      phone: newPhone
    })
  }

  render() {
    return (
      <div className="establishment-phone-input-container">
        <EstablishmentPhoneInput
          value={this.state.establishment.phone}
          onPhoneChange={this.onPhoneChange.bind(this)}
          mode="show"
        />
      </div>
    );
  }

}

class EstablishmentPhoneInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: (props.value || ""),
      mode: props.mode
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: (props.value || "")
    });
  }

  componentDidUpdate() {
    if(this.state.mode == "edit"){
      this._input.focus();
    }
  }

  inputChange(e) {
    this.setState({ value: e.target.value });
  }

  inputCancel(e) {
    this.setState({ 
      mode: "show",
      value: this.props.value
    });
  }

  inputSuccess(e) {
    this.setState({ mode: "show" });
    this.props.onPhoneChange(this.state.value);
  }

  pencilClick(e) {
    this.setState({ mode: "edit" });
  }

  render() {
    const labelCl = classNames({
      "hidden": this.state.mode != "show"
    });
    const inputCl = classNames({
      "hidden": this.state.mode == "show"
    });
    return (
      <div>
        <div className={labelCl}>
          {this.state.value}
          <i 
            className="fa fa-pencil"
            onClick={this.pencilClick.bind(this)}/>
        </div>
        <div className={inputCl}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.inputChange.bind(this)}
            onBlur={this.inputCancel.bind(this)}
            ref={(c) => this._input = c}/>
          <div className="input-actions">
            <a 
              className="small button success"
              onMouseDown={this.inputSuccess.bind(this)}>
              <i className="fa fa-check"/>
            </a>
            <a 
              className="small button alert"
              onClick={this.inputCancel.bind(this)}>
              <i className="fa fa-times"/>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const EstablishmentPhoneContainer = FluxUtils.Container.create(EstablishmentPhone);