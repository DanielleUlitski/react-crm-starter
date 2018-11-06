import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Badge from './Badge';
@inject(allStores => ({
    emailsSent: allStores.clients.emailsSent
}))
@observer
class Emails extends Component {

    render() {
        return (
            <div className="emails-sent">
                <Badge src={"https://support.apple.com/library/content/dam/edam/applecare/images/en_US/il/ios9-mail-app-icon-left-wrap.png"} id="emails" />
                <span className="number">{this.props.emailsSent}</span><br />
                <span>Emails Sent</span>
            </div>
        );
    }
}

export default Emails;