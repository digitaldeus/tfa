$(document).on 'page:change', ->
  # setup the autocomplete
  input = document.getElementById('church-search')
  options =
    componentRestrictions:
      country: 'us'
  autocomplete = new google.maps.places.Autocomplete input, options

  google.maps.event.addListener autocomplete, 'place_changed', ->
    console.log autocomplete.getPlace()

