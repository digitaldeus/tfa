import React, {Component} from 'react'
import {Container} from 'flux/utils'
import SearchStore from '../flux/SearchStore'
import AppDispatcher from '../flux/AppDispatcher'

const Search = React.createClass({
  render: function () {
    return (
      <div className={this.props.name + '-container'}>
        <input className={this.props.name} id={this.props.name} placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={e => this.props.onSearchPredictions(e.target.value) }
          onFocus={e => {
            this.props.onSearchPredictions(e.target.value);
          } }
          onBlur={ this.props.onRemovePredictions }
          ref="searchInput" />
        <ul className="search-result-container">
          {
            this.props.predictions.map(p => (
              <li key={p.place_id}
                className={`search-result #{this.props.name}-result`}
                onMouseDown={e => this.props.onPlaceSelected(p) }>{p.description}</li>
            ))
          }
        </ul>
      </div>
    )
  }
});

export class ChurchSearch extends Component {
  static getStores() {
    return [SearchStore];
  }

  static calculateState(prevState) {
    return SearchStore.getState();
  }

  render() {
    return (
      <Search
        name="church-search"
        placeholder="Search for a church"
        value={this.state.churchInput}
        onSearchPredictions={(input) => AppDispatcher.searchChurch(input) }
        onRemovePredictions={() => AppDispatcher.hideChurchPredictions() }
        onPlaceSelected={(l) => AppDispatcher.selectChurch(l) }
        predictions={SearchStore.getChurchPredictions()}
        />
    )
  }
};

class LocationSearch extends Component {
  static getStores() {
    return [SearchStore];
  }

  static calculateState(prevState) {
    return SearchStore.getState();
  }

  render() {
    return (
      <Search
        name="location-search"
        placeholder="Enter a location"
        value={this.state.locationInput}
        onSearchPredictions={(input) => AppDispatcher.searchLocations(input) }
        onRemovePredictions={() => AppDispatcher.hideLocationPredictions() }
        onPlaceSelected={(l) => AppDispatcher.selectLocation(l) }
        predictions={SearchStore.getLocationPredictions()}
        />
    )
  }
}

export const LocationSearchContainer = Container.create(LocationSearch);
export const ChurchSearchContainer = Container.create(ChurchSearch);
