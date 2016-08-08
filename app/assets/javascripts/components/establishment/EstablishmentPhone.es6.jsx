class EstablishmentPhone extends React.Component {

  static getStores() {
    return [AppEstablishmentStore];
  }

  static calculateState() {
    return AppEstablishmentStore.getState();
  }

  onAttributeChange(key, value){
    EstablishmentActions.update({
      id: this.state.establishment.id,
      phone: value
    })
  }

  render() {
    return (
      <div className="phone-input-container">
        <EstablishmentPhoneInput
          value={this.state.establishment.phone}
          onAttributeChange={this.onAttributeChange.bind(this)}
          mode="show"
        />
      </div>
    );
  }

}

class EstablishmentPhoneInput extends EditableInput {
  render() {
    const labelCl = classNames({
      "hidden": this.state.mode != "show"
    });
    const inputCl = classNames({
      "input-with-actions": true,
      "hidden": this.state.mode == "show"
    });
    const pencilCl = classNames({
      "fa fa-pencil": true,
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
        <i 
          className={pencilCl}
          onClick={this.pencilClick.bind(this)}/>
      </div>
    );
  }
}

const EstablishmentPhoneContainer = FluxUtils.Container.create(EstablishmentPhone);