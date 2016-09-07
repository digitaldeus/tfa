class ProfileDescriptionInput extends EditableInput {
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
            {this.props.header}
          </div>
          <div className="float-right">
            <i 
              className="ci ci-edit"
              onClick={this.pencilClick.bind(this)}/>
          </div>
        </div>

        <div className="about-content">
          <div className={labelCl}>
            {this.state.value}
          </div>
          <div className={inputCl}>
            <textarea
              value={this.state.value || ""}
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