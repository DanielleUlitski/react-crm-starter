import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Badge from './Badge';
@inject(allStores => ({
    outStandingClients: allStores.clients.outStandingClients
}))
@observer
class OutStandingClients extends Component {

    render() {
        return (
            <div className="outstanding">
                <Badge src="http://icons.iconarchive.com/icons/pelfusion/long-shadow-media/256/Contact-icon.png" />
                <span className="number">{this.props.outStandingClients}</span><br />
                <span>Outstanding Clients</span>
            </div>
        );
    }
}

export default OutStandingClients;