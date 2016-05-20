import React from 'react'

import Header from './Header'
import Footer from './Footer'

import Home from './Home'

export default React.createClass({
  render: function() {
    return (
      <div className="body">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
});