class EditableInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: (props.value || ""),
      attrKey: props.attrKey,
      mode: props.mode
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: (props.value || "")
    });
  }

  componentDidUpdate() {
    if(this.state.mode == "edit"){
      this._input.focus();
    }
  }

  inputChange(e) {
    this.setState({ value: e.target.value });
  }

  inputCancel(e) {
    this.setState({ 
      mode: "show",
      value: this.props.value
    });
  }

  inputSuccess(e) {
    this.setState({ mode: "show" });
    this.props.onAttributeChange(this.props.attrKey ,this.state.value);
  }

  pencilClick(e) {
    this.setState({ mode: "edit" });
  }

  render() {
    return (
      <div className="editable-input">
      </div>
    );
  }
}