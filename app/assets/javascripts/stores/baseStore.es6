class BaseStore extends FluxUtils.ReduceStore {

  // Used for loading gon data on turbolinks load event
  // Check utils/baseAPI
  loadFromGon(data) {
    console.log(data);
  }
}
