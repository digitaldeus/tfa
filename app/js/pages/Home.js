import React from 'react'
import Signup from './shared/Signup' 

export default React.createClass({
  render: function () {
    return (
      <div className="landing">
        <div className="hero-container">
          <div className="row">
            <div className="container small-12">
              <ul className="claims">
                <li>
                  <span className="big">Find</span>
                  <span className="small">new members</span>
                </li>
                <li>
                  <span className="big">Connect</span>
                  <span className="small">with congregation</span>
                </li>
                <li>
                  <span className="big">Worship</span>
                  <span className="small">anywhere</span>
                </li>
              </ul>
            </div>
            <div className="container small-12 text-center medium-text-right">
              <ul className="list-inline">
                <li className="social-link">
                  <a href="#"><img src="/img/landing/icon-facebook.svg" alt="Icon facebook" /></a>
                </li>
                <li className="social-link">
                  <a href="#"><img src="/img/landing/icon-twitter.svg" alt="Icon twitter" /></a>
                </li>
                <li className="social-link">
                  <a href="#"><img src="/img/landing/icon-google_plus.svg" alt="Icon google plus" /></a>
                </li>
                <li className="social-link">
                  <a href="#"><img src="/img/landing/icon-instagram.svg" alt="Icon instagram" /></a>
                </li>
                <li className="social-link">
                  <a href="#"><img src="/img/landing/icon-youtube.svg" alt="Icon youtube" /></a>
                </li>
                <li className="social-link">
                  <a href="#"><img src="/img/landing/icon-linkedin.svg" alt="Icon linkedin" /></a>
                </li>
              </ul>

            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="medium-5 columns hide-for-small-only"><img src="/img/landing/phone-profile.png" alt="Phone profile" /></div>
            <div className="medium-7 columns">
              <h2>Extend your church beyond the sanctuary and into the hands of thousands!</h2>
              <strong>YOUR ENTIRE CHURCH RIGHT HERE</strong>
              <br/>
              <p>
                Your church is so much more than a building.It’s a living breathing organization with so much to showcase.
                With your custom profile on The Fellowship App you can do just that and so much more.
              </p>
              <strong>WORSHIP ON-DEMAND</strong>
              <p>
                Worship isn’t just on Sunday or in the confines of the sanctuary.Allow people to stream your live service
                and
                past sermons whenever they like from anywhere in the world.
              </p>
              <div className="text-center medium-text-left">
                <img src="/img/landing/Sermons.png" alt="Sermons" />
              </div>
            </div>
          </div>
        </div>
        <div className="container bg-lightgrey nopad-bottom">
          <div className="row" style={{padding: "0.9375rem", paddingBottom:0}}>
            <div className="row medium-7 columns">
              <h2>Be found by aspiring worshippers everywhere!</h2>
              <p>
                Stop spending hundreds or even thousands on ineffective advertising.Place your church directly in the palms
                of
                people who need you most.
              </p>
              <div className="row">
                <div className="large-6 columns">
                  <strong>SMART FILTERS</strong>
                  <p>
                    Every church is unique and we want people to be able to search what makes them special.From denomination
                    to service times and amenities we help people find the church that fits them best.
                  </p>
                  <strong>SEE WHAT’S IN YOUR AREA.ANYWHERE</strong>
                  <p>
                    Find a place to worship close to where you are, wether you have been there for a few years, just moved to
                    a
                    new area or are traveling over the weekend.It’s all right in your hand.
                  </p>
                </div>
                <div className="large-6 columns show-for-large align-bottom text-right">
                  <img src="/img/landing/phone-filter.png" alt="Phone filter" />
                </div>
              </div>
            </div>
            <div className="medium-5 columns hide-for-small-only">
              <img src="/img/landing/phone-map.png" alt="Phone map" />
            </div>
          </div>
        </div>
        <div className="bg-darkgrey">
          <div className="container nopad-bottom">
            <div className="row">
              <div className="small-12 medium-5 columns align-bottom text-center medium-text-left"><img src="/img/landing/phone-tide.png" alt="Phone tide" /></div>
              <div className="small-12 medium-7 columns">
                <h2>Save time, save money.Take your giving to the next level.</h2>
                <strong>NO CASH, NO PROBLEM!</strong>
                <br/>
                <p>
                  Passing around an offering plate is great, if all your members carry hundreds in cash or still have a
                  leftover check.The digital age requires digital payments that can tracked, managed, and processed instantly.
                  Oh ye, from anywhere!
                </p>
                <strong>TAX SEASON, SHMAX SEASON</strong>
                <p>
                  The bigger your church the harder it is to keep track of individual giving come tax season.Well, The
                  Fellowship App makes it as breeze.We keep track of all your donations automatically and send you a simple
                  spreadsheet at the end of the year.You’re welcome Finance Ministry.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <figure className="text-center callout medium-4 small-12 columns">
              <img src="/img/landing/icon-callout-calendar.png" alt="Icon callout calendar" />
              <figcaption>
                <p>
                  <strong className="text-uppercase">SYNCHRONIZED CALENDAR</strong>
                </p>
                <p>
                  Synchronized Calendar makes it easy for your church to create events, sell tickets, and share RSVPs with
                  your congregation and the general public.
                </p>
              </figcaption>
            </figure>
            <figure className="text-center callout medium-4 small-12 columns">
              <img src="/img/landing/icon-callout-convo.png" alt="Icon callout convo" />
              <figcaption>
                <p>
                  <strong className="text-uppercase">DIRECT MESSAGING</strong>
                </p>
                <p>
                  Direct Messaging with Push Notifications allows you to keep in touch with your congregation outside of
                  church and assist them with questions right when they need it.
                </p>
              </figcaption>
            </figure>
            <figure className="text-center callout medium-4 small-12 columns">
              <img src="/img/landing/icon-callout-notes.png" alt="Icon callout notes" />
              <figcaption>
                <p>
                  <strong className="text-uppercase">NOTES &amp; BOOKMARKS</strong>
                </p>
                <p>
                  Bookmarks &amp; Notes allows worshippers to save churches, events, and take sermon notes in one easy
                  location.Bookmarks &amp; notes can be shared instantly with friends.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
        <Signup />
      </div>
    )
  }
});