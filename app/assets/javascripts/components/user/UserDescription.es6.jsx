class UserDescription extends React.Component {

  static getStores() {
    return [AppUserStore];
  }

  static calculateState() {
    return AppUserStore.getState();
  }

  onAttributeChange(key, value){
    UserActions.requestUserProfileUpdate({
      id: this.state.user_profile.id,
      description: value
    })
  }

  render() {
    return (
      <div className="about-container">
        <ProfileDescriptionInput
          value={ getChild(this, 'state.user_profile.description') || ""}
          header="About Me"
          onAttributeChange={this.onAttributeChange.bind(this)}
          mode="show"
        />
      </div>
    );
  }

}

const UserDescriptionContainer = FluxUtils.Container.create(UserDescription);