class UserDescription extends React.Component {

  static getStores() {
    return [AppUserStore];
  }

  static calculateState() {
    return AppUserStore.getState();
  }

  onAttributeChange(key, value){
    UserActions.updateUser({
      id: this.state.user.id,
      description: value
    })
  }

  render() {
    return (
      <div className="about-container">
        <ProfileDescriptionInput
          value={this.state.user.description}
          header="About Me"
          onAttributeChange={this.onAttributeChange.bind(this)}
          mode="show"
        />
      </div>
    );
  }

}

const UserDescriptionContainer = FluxUtils.Container.create(UserDescription);