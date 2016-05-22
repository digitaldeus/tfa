import React from 'react'
import {Container} from 'flux/utils'
import SearchStore from '../flux/SearchStore'

const Search = React.createClass({
  getInitialState: function () {
    return {
      predictions: [],
      selectedPlace: null
    };
  },
  selectPlace: function (location) {
    this.setState(Object.assign({}, this.state, {
      selectedPlace: location,
      predictions: []
    }));

    this.refs.searchInput.value = location.description;
  },
  updatePredictions: function (searchString) {
    if (searchString && typeof searchString === "string" && searchString.length > 1) {
      let predictions = [];
      // run the passed in autocomplete function
      this.props.onAutoComplete(searchString, (predictions) => {
        this.setState(Object.assign({}, this.state, { predictions }));
      });
    } else {
      this.removePredictions();
    }
  },
  removePredictions: function () {
    this.setState(Object.assign({}, this.state, {
      predictions: [],
      selectedPlace: null
    }));
  },
  render: function () {
    return (
      <div className={this.props.name + '-container'}>
        <input className={this.props.name} id={this.props.name} placeholder={this.props.placeholder}
          onChange={e => this.updatePredictions(e.target.value) }
          onFocus={e => {
            this.updatePredictions(e.target.value);
          } }
          onBlur={e => this.removePredictions() }
          ref="searchInput" />
        <ul className="search-result-container">
          {
            this.state.predictions.map(p => (
              <li key={p.place_id}
                className={`search-result #{this.props.name}-result`}
                onMouseDown={e => this.selectPlace(p) }>{p.description}</li>
            ))
          }
        </ul>
      </div>
    )
  }
});

export const ChurchSearch = React.createClass({
  doAutoComplete: function(input, callback) {
    console.log(input);
    const service = new google.maps.places.PlacesService();
  },
  render: function () {
    return (
      <Search
        name="church-search"
        placeholder="Search for a chuch"
        onAutoComplete={this.doAutoComplete}
        />
    );
  }
});

export const LocationSearch = React.createClass({
  doAutoComplete: function (input, callback) {
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({
      input: input, types: ['(cities)']
    }, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        callback(predictions.map(l => {
          const desc = l.terms.map(term => term.value);
          return {
            description: desc.splice(0, desc.length - 1).join(','),
            place_id: l.place_id
          };
        }));
      }
    });
  },
  render: function () {
    return (
      <Search
        name="location-search"
        placeholder="Enter a location"
        onAutoComplete={this.doAutoComplete}
        />
    )
  }
});