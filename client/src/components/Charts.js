import React, { Component } from 'react';
import TopEmployees from './TopEmployees'
import SalesBy from './SalesBy'
import SalesSince from './SalesSince';

class Charts extends Component {
  render() {
    return (
      <div className="charts">
          <TopEmployees />
          <SalesBy />
          <SalesSince />
      </div>
    );
  }
}

export default Charts;
