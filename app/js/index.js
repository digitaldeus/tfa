
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import Layout from './pages/Layout'
import Home from './pages/Home'

render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}/>
  </Router>
), document.getElementById('app'));