import React from 'react'
import {Container} from 'flux/utils'

import AppDispatcher from '../flux/AppDispatcher'
import SearchStore from '../flux/SearchStore'

require('../../scss/search_results.scss')

class ChurchListItem extends React.Component {

  render() {
    const c = this.props.church;

    return (
      <div className="church-search-entry">
        <img className="church-thumbnail" src={c.photo} />
        <div className="church-details">
          <div className="top">
            <span className="church-name">{c.description}</span>
            <img src="/img/landing/member-icon-temp.png" />
            <span className="church-distance">{c.distance}</span>
          </div>
          <div className="mid">
            <span className="church-address">{c.address}</span>
            <span><strong>Services: </strong><span>Sunday 9:00am</span>(Worship)</span>
          </div>
          <p className="church-details">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.In sollicitudin, 
            ligula id suscipit malesuada, diam tortor interdum sem, eget tristique nibh 
            tellus sed risus.Aliquam fermentum at arcu ac sollicitudin.Nunc a metus vel 
            quam mollis convallis.Suspendisse id lectus in quam semper finibus...
          </p>
        </div>
      </div>
    );
  }
}

export default class PlaceSearchList extends React.Component {
  render() {
    return (
      <div className="place-search-list">
        {
          this.props.churches.map(c => <ChurchListItem key={c.place_id} church={c} />)
        }
      </div>
    );
  }
}