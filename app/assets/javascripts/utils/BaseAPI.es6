// Provides simple fetch function that acts as global fetch but adds neccessary 
// headers and data
const BaseAPI = {
  fetch: (route, options) => {
    const token = BaseAPI.authenticityToken,
      headers = Object.assign({}, {
        'X-CSRF-Token': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, options.headers);

    // Assign new headers
    options.headers = headers;
    options.credentials = 'same-origin';

    // Delete body on GET requests
    if(options.method == 'GET')
      options.body = null;

    return fetch(route, options);
  }
}

// Store csrf token inside our API
$(() => {
  BaseAPI.authenticityToken = $("meta[name='csrf-token']").attr("content");
})

// Update script
// this script will update stores on turbolink page load.
// Stores are passed in gon.stores. First we check wheter there are global
// stores with the name and if, set new data on them.
$(document).on('turbolinks:load', () => {

  if(!gon) return;
  if(!gon.stores) return;

  console.log('Loading gon data to stores: ' + gon.stores.join(', '));

  gon.stores.forEach((store) => {
    if(window[store]){
      let {stores, ...data} = gon 
      
      dispatch({
        type: "GON_" + store.toUpperCase(),
        data: data
      })

    }
  });

});