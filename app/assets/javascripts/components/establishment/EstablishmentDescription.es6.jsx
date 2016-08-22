class EstablishmentDescription extends React.Component {

  static getStores() {
    return [AppEstablishmentStore];
  }

  static calculateState() {
    return AppEstablishmentStore.getState();
  }

  onAttributeChange(key, value){
    const data = { id: this.state.establishment.id };
    data[key] = value;
    EstablishmentActions.update(data);
  }

  render() {
    return (
      <div className="about-container">
        <EstablishmentDescriptionInput
          value={this.state.establishment.description}
          attrKey="description"
          onAttributeChange={this.onAttributeChange.bind(this)}
          mode="show"
        />
      </div>
    );
  }

}

class EstablishmentDescriptionInput extends EditableInput {
  render() {
    const labelCl = classNames({
      "hidden": this.state.mode != "show"
    });
    const inputCl = classNames({
      "editable-input-container": true,
      "hidden": this.state.mode == "show"
    });
    return (
      <div>
        <div className="about-header white-block-header clearfix">
          <div className="float-left">
            About Us
          </div>
          <div className="float-right">
            <i 
              className="fa fa-pencil"
              onClick={this.pencilClick.bind(this)}/>
          </div>
        </div>

        <div className="about-content">
          <div className={labelCl}>
            {this.state.value}
          </div>
          <div className={inputCl}>
            <textarea
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
                className="small button secondary"
                onClick={this.inputCancel.bind(this)}>
                <i className="fa fa-times"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const EstablishmentDescriptionContainer = FluxUtils.Container.create(EstablishmentDescription);