import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
@inject('clients')
@observer
class Updates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newOwner: "",
            newEmailType: "",
        }
    }

    componentDidMount() {
        if (this.props.clients.client) {
            this.setState({ newOwner: this.props.clients.client.owner, newEmailType: this.props.clients.client.emailType });
        }
    }

    populateOwners = () => {
        let owners = Object.keys(this.props.clients.owners);
        return owners.map(o => {
            if (this.props.clients.client.owner === o) {
                return (
                    <option selected value={o}>{o}</option>
                )
            } else {
                return (
                    <option value={o}>{o}</option>
                )
            }

        })
    }

    emailTypes = () => {
        let emails = Object.keys(this.props.clients.emailTypes);
        return emails.map(e => {
            if (this.props.clients.client.emailType === e) {
                return (
                    <option selected value={e}>{e}</option>
                )
            } else {
                return (
                    <option value={e}>{e}</option>
                )
            }
        })
    }

    change = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    transfer = () => {
        this.props.clients.transfer(this.state.newOwner);
    }

    send = () => {
        this.props.clients.send(this.state.newEmailType)
    }

    switchSale = () => {
        this.props.clients.switchSale()
    }

    render() {
        return (
            <div className="updates">
                <div>
                    <span>Transfer ownsership to</span>
                    <select id="newOwner" onChange={this.change}>
                        {this.populateOwners()}
                    </select>
                    <div><span onClick={this.transfer} >TRANSFER</span></div>
                </div>
                <div>
                    <span>Send email</span>
                    <select id="newEmailType" onChange={this.change}>
                        {this.emailTypes()}
                    </select>
                    <div><span onClick={this.send} >SEND</span></div>
                </div>
                <div>
                    <span>Declare sale!</span>
                    <div><span onClick={this.switchSale} >DECLARE</span></div>
                </div>
            </div>
        );
    }
}

export default Updates;
