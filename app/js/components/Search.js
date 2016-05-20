import React from 'react'

export const ChurchSearch = React.createClass({
  render: function() {
    return (
      <div className="church-search-container">
        <input class="church-search" id="church-search" placeholder="Search for a church" />
      </div>
    );
  }
});

export const LocationSearch = React.createClass({
  getInitialState: function() {
    return {
      predictions: [],
      selectedLocation: null
    };
  },
  selectedLocation: function(location) {
    this.setState(Object.assign({}, this.state, {
      selectedLocation: location,
      predictions: []
    }));
    
    this.refs.searchInput.value = location.description;
  },
  updatePredictions: function(searchString) {
    if (searchString && typeof searchString === "string" && searchString.length > 1) {
      let predictions = [];
      
      doAutoComplete(searchString, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.setState(Object.assign({}, this.state, {
            predictions: predictions.map(l => {
              const desc = l.terms.map(term => term.value);
              return {
                description: desc.splice(0, desc.length - 1).join(','),
                place_id: l.place_id
              };
            })
          }))
        }
        else {
          console.error("Couldn't get predictions for location, status was: ", status);
        }
      })
    } else {
      this.removePredictions();
    }
  },
  removePredictions: function() {
    this.setState(Object.assign({}, this.state, {
        predictions: [],
        selectedLocation: null
      }));
  },
  render: function() {
    return (
      <div className='location-search-container'>
        <input className="location-search" id="location-search" placeholder="Enter a location"
          onChange={e => this.updatePredictions(e.target.value)}
          onFocus={e => e.target.select()}
          onBlur={e => this.removePredictions()} 
          ref="searchInput" />
        <ul className="search-result-container">
          {
            this.state.predictions.map(p => (
              <li key={p.place_id} 
                className="search-result location-search-result"
                onClick={() => this.selectLocation(p)}>{p.description}</li>
            ))
          }
        </ul>
      </div>
    )
  }
});

const doAutoComplete = function(input, callback) {
  const service = new google.maps.places.AutocompleteService();
  service.getPlacePredictions ({input: input, types: ['(cities)']}, callback);
};