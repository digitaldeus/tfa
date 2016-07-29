class EstablishmentPhone extends React.Component {

  getStores(){
    return [AppEstablishmentStore];
  }

  calculateState(){
    return AppEstablishmentStore.getState();
  }

}