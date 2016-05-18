@ChurchSearch = React.createClass
  render: ->
    React.DOM.div
      className: 'church-search-container'
      React.DOM.input
        className: 'church-search'
        id: 'church-search'
        placeholder: 'Search for a church'
        
@LocationSearch = React.createClass
  render: ->
    React.DOM.div
      className: 'location-search-container'
      React.DOM.input
        className: 'location-search'
        id: 'location-search'
        placeholder: 'Enter a location'