const Search = React.createClass({
    submitForm: function (e) {
        console.log(e.which);
        if (e.which == 13) {
            // TODO: run validations here on form fields
            $(e.target).parents('form').submit();
        }
    },
    render: function () {
        const locName = this.props.locName ? <input type="hidden" name="locname" value={this.props.locName}/> : null;
        return (
            <div className={this.props.name + '-container'}>
                <input type="hidden" name={this.props.submitName} value={this.props.formValue}/>
                {locName}
                <input
                    autoComplete="off"
                    className={this.props.name}
                    id={this.props.name}
                    placeholder={this.props.placeholder}
                    value={this.props.textValue}
                    onChange={e => this.props.onSearchPredictions(e.target.value) }
                    onKeyPress={this.submitForm}
                    onFocus={e => {
                        this.props.onSearchPredictions(e.target.value);
                    } }
                    onBlur={ this.props.onRemovePredictions }
                    ref="searchInput"/>
                <ul className="search-result-container">
                    {
                        this.props.predictions.map(p => {
                            let distance = null;
                            if (p.distance) {
                                distance = <span className="search-distance">{p.distance}</span>;
                            }

                            return (
                                <li key={p.place_id}
                                    className={`search-result #{this.props.name}-result`}
                                    onMouseDown={e => this.props.onPlaceSelected(p) }>
                                    <div className="search-name">
                                        <span>{p.description}</span>
                                    </div>
                                    {/*distance*/}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
});

class ChurchSearch extends React.Component {
    static getStores() {
        return [AppSearchStore];
    }

    static calculateState(prevState) {
        return AppSearchStore.getState();
    }

    render() {
        return (
            <Search
                name="church-search"
                submitName="church"
                placeholder="Search for a church"
                textValue={this.state.churchInput}
                formValue={this.state.churchInput}
                onSearchPredictions={(input) => TFADispatcher.searchChurch(input) }
                onRemovePredictions={() => TFADispatcher.hideChurchPredictions() }
                onPlaceSelected={(l) => TFADispatcher.selectChurch(l) }
                predictions={this.state.churchPredictions}
                distance={this.state.distance}/>
        )
    }
}

class LocationSearch extends React.Component {
    static getStores() {
        return [AppSearchStore];
    }

    static calculateState(prevState) {
        return AppSearchStore.getState();
    }

    render() {
        return (
            <Search
                name="location-search"
                locName={this.state.locationInput}
                submitName="loc"
                placeholder="Enter a location"
                textValue={this.state.locationInput}
                formValue={AppSearchStore.getLocationString()}
                onSearchPredictions={(input) => TFADispatcher.searchLocations(input) }
                onRemovePredictions={() => TFADispatcher.hideLocationPredictions() }
                onPlaceSelected={(l) => TFADispatcher.selectLocation(l) }
                predictions={this.state.locationPredictions}
            />
        )
    }
}

const LocationSearchContainer = FluxUtils.Container.create(LocationSearch);
const ChurchSearchContainer = FluxUtils.Container.create(ChurchSearch);
