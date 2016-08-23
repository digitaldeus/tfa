class EstablishmentServices extends React.Component {

  static getStores() {
    return [AppEstablishmentStore];
  }

  static calculateState() {
    return AppEstablishmentStore.getState();
  }

  updateServiceTime(service_time) {
    const establishment = { 
      id: this.state.establishment.id,
      service_times_attributes: [service_time]
    };

    EstablishmentActions.updateEstablishment(establishment);
  }

  render() {
    return (
      <div className="service-container">
        <EstablishmentServicesList
          services={this.state.establishment.service_times || []}
          updateServiceTime={this.updateServiceTime.bind(this)}
          mode="show"
        />
      </div>
    );
  }
}

class EstablishmentServicesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      services: props.services
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      services: props.services
    });
  }

  plusClick() {
    const services = this.state.services;

    this.setState({
      services: services.concat([ { day: "Monday", start_time: "09:00" } ])
    })
  }

  render() {
    return (
      <div>
        <div className="service-header white-block-header clearfix">
          <div className="float-left">Service Times</div>
          <div className="float-right">
            <i 
              className="fa fa-plus"
              onClick={this.plusClick.bind(this)}/>
          </div>
        </div>
        <div>
          {
            this.state.services
              .filter((entry) => entry._destroy != true)
              .map((entry) => <EstablishmentServicesEntry
                                                  service={entry}
                                                  updateServiceTime={this.props.updateServiceTime}
                                                  key={entry.id}/>)
          }
        </div>
      </div>
    );
  }
}

class EstablishmentServicesEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: "show",
      service_time: props.service
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      service_time: props.service
    });
  }

  attrChange(key, event) {
    const service_time = Object.assign({}, this.state.service_time);
    service_time[key] = event.target.value;

    this.setState({ service_time });
  }

  pencilClick() {
    this.setState({ mode: "edit" })
  }

  inputSuccess() {
    const service_time = {...this.state.service_time};
    this.setState({ mode: "show" });
    this.props.updateServiceTime(service_time);
  }

  inputCancel() {
    this.setState({
      mode: "show",
      service_time: this.props.service
    });
  }

  inputRemove() {
    const service_time = {
      _destroy: true,
      ...this.state.service_time
    };
    this.props.updateServiceTime(service_time);
  }

  render() {
    const showCl = classNames({
      "row": true,
      "hidden": this.state.mode == "edit"
    }); 
    const editCl = classNames({
      "row": true,
      "hidden": this.state.mode == "show"
    });
    return (
      <div className="service-entry">

        <div className={showCl}>
          <div className="columns">
            <span className="service-day">{this.state.service_time.day}: </span>
            <span className="serivce-time">
              {this.state.service_time.start_time}
            </span>
          </div>
          <div className="columns">
            <span className="service-name">
              <span className="service-type">Type: </span>
              <span>{this.state.service_time.service_name}</span>
            </span>
          </div>
          <div className="columns shrink">
            <i
              onClick={this.pencilClick.bind(this)} 
              className="fa fa-pencil"/>
          </div>
        </div>

        <div className={editCl}>
          <div className="columns">
            <div>Day</div>
            <div>
              <select 
                onChange={this.attrChange.bind(this, "day")} 
                value={this.state.service_time.day}>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
          </div>
          <div className="columns">
            <div>Time</div>
            <div>
              <input
                type="time"
                placeholder="hh:mm"
                value={this.state.service_time.start_time}
                onChange={this.attrChange.bind(this, "start_time")}/>
            </div>
          </div>
          <div className="columns">
            <div>Service</div>
            <div>
              <input
                type="text"
                placeholder="Service"
                value={this.state.service_time.service_name}
                onChange={this.attrChange.bind(this, "service_name")}/>
            </div>
          </div>
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

            <a
              className="small button alert"
              onClick={this.inputRemove.bind(this)}>
              Remove
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const EstablishmentServicesContainer = FluxUtils.Container.create(EstablishmentServices);