import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Clients from './components/Clients'
import Action from './components/Actions';
import Analytics from './components/Analytics'
import './App.css';


class Main extends Component {
  render() {
    return (
      <Router>
        <div className="main">
          <ul className="nav">
            <li><Link to='/Clients' >Clients</Link></li>
            <li><Link to='/Actions' >Actions</Link></li>
            <li><Link to='/Analytics' >Analytics</Link></li>
          </ul>
          <Route exact path='/Clients' component={Clients} />
          <Route exact path='/Actions' component={Action} />
          <Route exact path='/Analytics' component={Analytics} />
        </div>
      </Router>
    );
  }
}

export default Main;
