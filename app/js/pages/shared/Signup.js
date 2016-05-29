import React from 'react'

export default React.createClass({
  render: function () {
    return (
      <div className="container bg-lightgrey" style={{ paddingLeft: "1.5625rem", paddingRight: "1.5625rem" }}>
        <div className="row">
          <div className="medium-12 large-5">
            <strong>EXPLORE</strong>
            <h2>Sign Up Now for Free!</h2>
            <p className="font-12">
              Create a free profile for your church or sign-up for one of our premium accounts to unlock some amazing
              features.You can also sign-up as a worshipper to access churches in your area.
            </p>
          </div>
          <div className="medium-12 large-7 text-right">
            <blockquote className="text-right">
              <p style={{ marginBottom: 6 }}>"To have effective worship, you have to have the right kind of technology!"</p>
              <footer>- Pastor Mike Kiley (Home Church - Campbell, CA) </footer>
            </blockquote>
          </div>
        </div>
      </div>
    );
  }
});