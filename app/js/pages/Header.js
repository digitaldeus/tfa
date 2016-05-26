import React from 'react'
import {Link} from 'react-router'
import {ChurchSearchContainer, LocationSearchContainer} from '../components/Search'
import SearchStore from '../flux/SearchStore'

export default React.createClass({
  render: function() {
    return (
      <div className="title-wrapper">
        <div className="row title-row">
          <div className="title-bar small-12 hide-for-large" data-hide-for="large" data-responsive-toggle="dropdown-menu" style={{display: "none"}}>
            <div className="title-bar-left">
              <Link className="title-brand" to="/"><img src="/img/logo-short.png" alt="Logo short" /></Link>
            </div>
            <div className="title-bar-right">
              <button className="menu-icon" data-toggle="" type="button"></button>
              <ul id="dropdown-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact_us">Contact Us</Link></li>
                <li>
                  <Link to="/users/sign_in">Sign in</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="top-bar show-for-large small-12" id="desktop-menu">
            <div className="top-bar-left">
              <Link className="title-brand" to="/"><img src="/img/logo-short.png" alt="Logo short" /></Link>
              <form method="get" action="/search" autoComplete="off"
                style={{display: 'flex', flex: 1, alignItems: 'center'}}
                onKeyPress={(e) => {
                  if (e.which === 13) {
                    e.preventDefault();
                    if (SearchStore.churchSearchValid()) {
                      this.refs.searchForm.submit();
                    } else {
                      toastr.error('Please select a location before searching...', 'Oopsy');
                    }
                  }
                }}
                ref="searchForm">
                
                <ChurchSearchContainer />
                <LocationSearchContainer />
              </form>
            </div>
            <div className="top-bar-right">
              <ul className="menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact_us">Contact Us</Link></li>
                <li>
                  <Link to="/users/sign_in">Sign in</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
});