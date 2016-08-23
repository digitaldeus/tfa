class UserPhone extends React.Component {

  static getStores() {
    return [AppUserStore];
  }

  static calculateState() {
    return AppUserStore.getState();
  }

  onAttributeChange(key, value){
    UserActions.updateUser({
      id: this.state.user.id,
      phone: value
    })
  }

  render() {
    return (
      <div className="phone-input-container">
        <ProfilePhoneInput
          value={this.state.user.phone}
          onAttributeChange={this.onAttributeChange.bind(this)}
          mode="show"
        />
      </div>
    );
  }

}

const UserPhoneContainer = FluxUtils.Container.create(UserPhone);