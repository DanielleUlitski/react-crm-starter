import React, { Component } from 'react';
import NewClients from './NewClients'
import Emails from './Emails';
import OutstandingClients from './OutstandingClients'
import BestSeller from './BestSellerCountry';

class Badges extends Component {
  render() {
    return (
      <div className="badges">
        <NewClients />
        <Emails />
        <OutstandingClients />
        <BestSeller />
      </div>
    );
  }
}

export default Badges;
