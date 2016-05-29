import React from 'react';
import { Link } from 'react-router'

export default React.createClass({
  render: function() {
    return (
      <div className="container bg-blue footer">
        <div className="row">
          <div className="small-12 large-6 text-center large-text-left">
            <ul className="menu footer-links" style={{marginTop: "1.563rem"}}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact_us">Contact Us</Link></li>
              <li>
                <Link to="/users/sign_in">Sign in</Link>
              </li>
            </ul>
          </div>
          <div className="small-12 large-6">
            <ul className="list-inline">
              <li className="social-link">
                <Link to="#"><img src="/img/landing/icon-facebook.svg" alt="Icon facebook" /></Link>
              </li>
              <li className="social-link">
                <Link to="#"><img src="/img/landing/icon-twitter.svg" alt="Icon twitter" /></Link>
              </li>
              <li className="social-link">
                <Link to="#"><img src="/img/landing/icon-google_plus.svg" alt="Icon google plus" /></Link>
              </li>
              <li className="social-link">
                <Link to="#"><img src="/img/landing/icon-instagram.svg" alt="Icon instagram" /></Link>
              </li>
              <li className="social-link">
                <Link to="#"><img src="/img/landing/icon-youtube.svg" alt="Icon youtube" /></Link>
              </li>
              <li className="social-link">
                <Link to="#"><img src="/img/landing/icon-linkedin.svg" alt="Icon linkedin" data-pin-nopin="true" /></Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row" style={{padding: "1.875rem"}}>
          <div className="small-12 large-6">
            <small className="copyright">
              Copyright ©
              2016
              The Fellowship App. All Rights Reserved.
            </small>
          </div>
          <div className="small-12 large-6">
            <small className="copyright" style={{color: 'white'}}>We value your privacy. None of the details supplied will be shared with external parties</small>
          </div>
        </div>
      </div>
    );
  }
});