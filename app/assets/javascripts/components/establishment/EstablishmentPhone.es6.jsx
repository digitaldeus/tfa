class EstablishmentPhone extends React.Component {

  static getStores() {
    return [AppEstablishmentStore];
  }

  static calculateState() {
    return AppEstablishmentStore.getState();
  }

  onAttributeChange(key, value){
    EstablishmentActions.updateEstablishment({
      id: this.state.establishment.id,
      phone: value
    })
  }

  render() {
    return (
      <div className="phone-input-container">
        <ProfilePhoneInput
          value={this.state.establishment.phone || ""}
          onAttributeChange={this.onAttributeChange.bind(this)}
          mode="show"
        />
      </div>
    );
  }

}

const EstablishmentPhoneContainer = FluxUtils.Container.create(EstablishmentPhone);