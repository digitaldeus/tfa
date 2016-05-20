import React from 'react'
import {ChurchSearch, LocationSearch} from '../components/Search'

export default React.createClass({
  render: function() {
    return (
      <div className="title-wrapper">
        <div className="row title-row">
          <div className="title-bar small-12 hide-for-large" data-hide-for="large" data-responsive-toggle="dropdown-menu" style={{display: "none"}}>
            <div className="title-bar-left">
              <a className="title-brand" href="/"><img src="/img/logo-short.png" alt="Logo short" /></a>
            </div>
            <div className="title-bar-right">
              <button className="menu-icon" data-toggle="" type="button"></button>
              <ul id="dropdown-menu">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact_us">Contact Us</a></li>
                <li>
                  <a href="/users/sign_in">Sign in</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="top-bar show-for-large small-12" id="desktop-menu">
            <div className="top-bar-left">
              <a className="title-brand" href="/"><img src="/img/logo-short.png" alt="Logo short" /></a>
              <ChurchSearch />
              <LocationSearch />
            </div>
            <div className="top-bar-right">
              <ul className="menu">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact_us">Contact Us</a></li>
                <li>
                  <a href="/users/sign_in">Sign in</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
});