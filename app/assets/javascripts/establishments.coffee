# Setup the autocomplete
$(document).on 'page:change', ->
  input = document.getElementById('establishment_location_attributes_address')
  place_id_input = document.getElementById('establishment_location_attributes_place_id')

  # pull place components from and update the values
  updateAddressFromPlace = (place) ->
    addr= {}

    for comp in place.address_components
      type = comp.types[0]
      if type is "locality"
        addr[type] = comp.long_name
      else
        addr[type] = comp.short_name
    console.log addr

    document.getElementById('establishment_location_attributes_address').value = "#{addr.street_number} #{addr.route}"
    document.getElementById('establishment_location_attributes_latitude').value = place.geometry.location.lat()
    document.getElementById('establishment_location_attributes_longitude').value = place.geometry.location.lng()
    document.getElementById('establishment_location_attributes_place_id').value = place.place_id
    document.getElementById('establishment_location_attributes_city').value = addr.locality
    document.getElementById('establishment_location_attributes_state').value = addr.administrative_area_level_1
    document.getElementById('establishment_location_attributes_zip').value = addr.postal_code
    return

  if input
    autocomplete = new google.maps.places.Autocomplete(input,
      {types: ['geocode']})
    autocomplete.addListener 'place_changed', ->
      place = autocomplete.getPlace()
      console.log place

      return

  # setup initially if place passed in
  if place_id_input and place_id_input.value
    pid = place_id_input.value
    ps = new google.maps.places.PlacesService(new google.maps.Map(document.createElement('div')))
    ps.getDetails placeId: pid, (place, status) ->
      console.log place, status
      return unless status is google.maps.places.PlacesServiceStatus.OK
      updateAddressFromPlace place

      document.getElementById('establishment_website').value = place.website
      document.getElementById('establishment_name').value = place.name
      document.getElementById('establishment_phone').value = place.formatted_phone_number
  return