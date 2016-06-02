@ChurchSearch = React.createClass
  render: ->
    React.DOM.div
      className: 'church-search-container'
      React.DOM.input
        className: 'church-search'
        id: 'church-search'
        placeholder: 'Search for a church'
        
@LocationSearch = React.createClass
  getInitialState: ->
    predictions: []
    selectedLocation: null

  componentDidMount: ->
    el = ReactDOM.findDOMNode(this)

  selectLocation: (location) ->
    @setState Object.assign this.state,
      selectedLocation: location,
      predictions: []

    @refs.searchInput.value = location.description

  updatePredictions: (searchString) ->

    if searchString and typeof searchString is "string" and searchString.length > 1
      predictions = []

      doAutoComplete searchString, (predictions, status) =>
        if status is google.maps.places.PlacesServiceStatus.OK
          @setState(
            Object.assign this.state,
              predictions: for l in predictions
                desc = (term.value for term in l.terms)

                description: desc[0..-2].join ', '
                place_id: l.place_id
          )
        else
          console.error "Couldn't get predictions for location, status was: ", status

  render: ->
    React.DOM.div
      className: 'location-search-container'
      React.DOM.input
        className: 'location-search'
        id: 'location-search'
        placeholder: 'Enter a location'
        onChange: (e) => @updatePredictions(e.target.value)
        onFocus: (e) -> e.target.select()
        ref: 'searchInput'
      React.DOM.ul
        className: 'search-result-container'
        @state.predictions.map (p) =>
          React.DOM.li
            key: p.place_id
            className: 'search-result location-search-result'
            onClick: => @selectLocation(p)
            p.description


doAutoComplete = (input, callback) ->
  service = new google.maps.places.AutocompleteService()
  service.getPlacePredictions {input: input, types: ['(cities)']}, callback