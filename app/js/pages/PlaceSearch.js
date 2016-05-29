import React, {Component} from 'react'
import {Container} from 'flux/utils'
import SearchStore from '../flux/SearchStore'
import AppDispatcher from '../flux/AppDispatcher'
import Signup from './shared/Signup'
import PlaceSearchList from '../components/PlaceSearchList'

class PlaceSearch extends Component{
  static getStores() {
    return [SearchStore];
  }
  
  static calculateState(prevState) {
    return SearchStore.getState();
  }
  
  componentDidMount() {
    // SearchStore.setSearch()
    AppDispatcher.setLocation({
      lat: this.props.location.query.loc.split(',')[0],
      lng: this.props.location.query.loc.split(',')[1]
    });
    
    // make sure we have the correct search input set
    AppDispatcher.setChurchInput(this.props.location.query.church);
    
    // get the churches for this search
    AppDispatcher.getChurches();
  }
  
  render() {
    return (
      <div>
        <div className="place-search-container">
          <div className="hero-container placesearch-hero-container">
            <div className="row">
              <div className="small-12">
                <h2 style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <strong>{this.props.location.query.church}</strong> near <strong>{this.state.locationInput}</strong>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <PlaceSearchList lat={this.lat} lng={this.lng} {...this.props} churches={this.state.searchResults} />
        <Signup />
      </div>
    );
  }
}

export default Container.create(PlaceSearch);