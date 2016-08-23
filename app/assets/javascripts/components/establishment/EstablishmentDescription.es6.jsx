class EstablishmentDescription extends React.Component {

  static getStores() {
    return [AppEstablishmentStore];
  }

  static calculateState() {
    return AppEstablishmentStore.getState();
  }

  onAttributeChange(key, value){
    EstablishmentActions.updateEstablishment({
      id: this.state.establishment.id,
      description: value
    })
  }

  render() {
    return (
      <div className="about-container">
        <EstablishmentDescriptionInput
          value={this.state.establishment.description}
          header="About Us"
          onAttributeChange={this.onAttributeChange.bind(this)}
          mode="show"
        />
      </div>
    );
  }

}

const EstablishmentDescriptionContainer = FluxUtils.Container.create(EstablishmentDescription);