import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import AutoComplete from './AutoComplete';
import Updates from './Updates'
import AddClient from './AddClient'
@inject('clients')
@observer
class Action extends Component {

  componentDidMount() {
    this.props.clients.populateClients(null, null, false, true);
  }

  validateClient = (clientName) => {
    this.props.clients.clients.map(client => {
      if (client.name === clientName) {
        this.props.clients.selectClient(client);
      }
      return null;
    })
    if (!this.props.clients.client.name) {
      return false
    }
    return true
  }

  render() {
    return (
      <div className="Action">
        <div className="update-fields">
          <h3>UPDATE</h3>
          <span>Client:</span>
          <AutoComplete validate={this.validateClient} />
          <Updates />
          <div className="seperation">
            <hr />
            <h3>ADD CLIENT</h3>
          </div>
          <AddClient />
        </div>
      </div>
    );
  }
}

export default Action;
