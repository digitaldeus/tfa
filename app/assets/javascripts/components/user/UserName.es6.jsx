class UserName extends React.Component {

  static getStores() {
    return [AppUserStore];
  }

  static calculateState() {
    return AppUserStore.getState();
  }

  onAttributeChange(key, value){
    UserActions.requestUserProfileUpdate({
      id: this.state.user_profile.id,
      name: value
    })
  }

  render() {
    return (
      <div className="name-input-container">
        <UserNameInput
          value={ getChild(this, 'state.user_profile.name') || ""}
          onAttributeChange={this.onAttributeChange.bind(this)}
          mode="show"
        />
      </div>
    );
  }

}

class UserNameInput extends EditableInput {

  render() {
    const labelCl = classNames({
      "user-name-show": true,
      "hidden": this.state.mode != "show"
    });
    const inputCl = classNames({
      "editable-input-container": true,
      "hidden": this.state.mode == "show"
    });
    const pencilCl = classNames({
      "ci ci-edit": true,
      "hidden": this.state.mode == "edit"
    });
    return (
      <div className="user-name-input-container">
        <div className={labelCl}>
          {this.state.value || "Anonymouse"}
        </div>
        <div className={inputCl}>
          <input
            type="text"
            value={this.state.value}
            placeholder="Anonymouse"
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
        <i 
          className={pencilCl}
          onClick={this.pencilClick.bind(this)}/>
      </div>
    );
  }

}

const UserNameContainer = FluxUtils.Container.create(UserName);