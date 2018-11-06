import React, { Component } from 'react';
import Badge from './Badge'
import { inject, observer } from 'mobx-react';
@inject(allStores => ({
  counter: allStores.clients.newClientsCounter
}))
@observer
class NewClients extends Component {

  genDesc = () => {
    let month = new Date();
    month = month.toLocaleString('en-us', { month: 'long' });
    return `New ${month} Clients`
  }

  render() {
    return (
      <div className="new-clients">
        <Badge src="https://st2.depositphotos.com/3538103/5411/v/450/depositphotos_54116429-stock-illustration-infographic-chart-icon.jpg" />
        <span className="number" >{this.props.counter}</span><br />
        <span className="description-of-number">{this.genDesc()}</span>
      </div>
    );
  }
}

export default NewClients;
