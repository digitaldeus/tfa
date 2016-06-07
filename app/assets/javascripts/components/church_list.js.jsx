class ChurchListItem extends React.Component {

    render() {
        const c = this.props.church;

        return (
            <div className="church-search-entry">
                <div className="church-thumbnail" style={{background: `url(${c.photo}) top center no-repeat`}}>
                    <img className="church-size" src={this.props.member_icon}/>
                </div>

                <div className="church-details">
                    <div className="top">
                        <span className="church-name">{c.description}</span>

                        <span className="church-service-times"><span className="church-service-time">Sunday 9:00am</span>(Worship)</span>
                    </div>
                    <div className="mid">
                        <span className="church-address">{c.address}</span>
                    </div>
                    <p className={ "church-description " + (c.registered ? "registered" : "unregistered") }>
                        This church has not completed a profile. If you are a staff member & <br />
                        would like to claim this profile, request access here.
                    </p>

                    <span className="church-distance">{c.distance}<br/><span className="smaller">mi</span></span>
                </div>
            </div>
        );
    }
}

class PlaceSearchList extends React.Component {
    static getStores() {
        return [AppSearchStore];
    }

    static calculateState(prevState) {
        return AppSearchStore.getState();
    }

    componentDidMount() {
        // get the churches for this search
        TFADispatcher.getChurches();
    }

    render() {
        return (
            <div className="place-search-list">
                {
                    this.state.searchResults.map(c => <ChurchListItem key={c.place_id} church={c} {...this.props}/>)
                }
            </div>
        );
    }
}

const PlaceSearchListContainer = FluxUtils.Container.create(PlaceSearchList);
