// This is place for simple API calls that could be used in more general way


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