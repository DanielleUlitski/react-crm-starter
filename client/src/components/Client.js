import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Editor from './Editor'
@inject(allStores => ({
    edit: allStores.clients.editClient
}))
@observer
class Client extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: 'none',
        }
    }

    showModal = () => {
        this.setState({ display: 'block' }, () => {
            console.log(this.state.display)
        })
    }

    hideModal = () => {
        this.setState({ display: 'none' }, () => {
            console.log(this.state.display)
        })
    }

    getFirstName = () => {
        return this.props.client.name.split(" ")[0]
    }

    getSurName = () => {
        return this.props.client.name.split(" ")[1]
    }

    getSold = () => {
        if (this.props.client.sold) {
            return "Sold"
        }
        return "Not Sold"
    }

    edit = (name, surname, country) => {
        this.props.edit(this.props.index, { name: name + " " + surname, country: country }, this.props.min, this.props.max)
    }

    render() {
        return (
            <tr onClick={this.showModal}>
                <td>{this.getFirstName()}</td>
                <td>{this.getSurName()}</td>
                <td>{this.props.client.country}</td>
                <td>{new Date(this.props.client.firstContact).toLocaleString('en-us', { month: '2-digit', day: '2-digit', year: 'numeric' })}</td>
                <td>{this.props.client.emailType}</td>
                <td>{this.getSold()}</td>
                <td>{this.props.client.owner}</td>
                <td><Editor showModal={this.showModal} hideModal={this.hideModal} display={this.state.display} client={this.props.client} edit={this.edit} /></td>
            </tr>
        );
    }
}

export default Client;