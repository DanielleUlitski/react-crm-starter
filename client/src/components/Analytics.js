import React, { Component } from 'react';
import Badges from './Badges'
import Charts from './Charts'
import { inject, observer } from 'mobx-react';

@inject('clients')
@observer
class Analytics extends Component {

  componentWillMount() {
    this.props.clients.populateClients(null, null, false, false, true);
  }

  render() {
    return (
      <div className="main">
        <Badges />
        <Charts />
      </div>
    );
  }
}

export default Analytics;
