class ProfilePhoneInput extends EditableInput {
  render() {
    const labelCl = classNames({
      "editable-input-show": true,
      "hidden": this.state.mode != "show"
    });
    const inputCl = classNames({
      "input-with-actions": true,
      "hidden": this.state.mode == "show"
    });
    const pencilCl = classNames({
      "ci ci-edit": true,
      "hidden": this.state.mode == "edit"
    });
    return (
      <div>
        <div className={labelCl}>
          {this.state.value || "(000) 000-0000"} &nbsp;
        </div>
        <div className={inputCl}>
          <input
            type="text"
            value={this.state.value || ""}
            placeholder="(000) 000-0000"
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