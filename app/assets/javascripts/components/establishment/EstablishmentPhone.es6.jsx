class EstablishmentPhone extends React.Component {

  static getStores(){
    return [AppEstablishmentStore];
  }

  static calculateState(){
    return AppEstablishmentStore.getState();
  }

  componentDidMount(){
    console.log('Establishment Phonw mounted');
  }

  render(){
    return (
      <div className="establishment-phone"></div>
    );
  }

}

const EstablishmentPhoneContainer = FluxUtils.Container.create(EstablishmentPhone);