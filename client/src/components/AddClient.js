import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
@inject(allStores => ({
    addNewClient : allStores.clients.addNewClient,
    owners : allStores.clients.owners,
}))
@observer
class AddClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            surName: "",
            country: "",
            owner: ""
        }
    }

    populateOwners = () => {
        let owners = Object.keys(this.props.owners);
        return owners.map(o => {
            return (
                <option value={o}>{o}</option>
            )
        })
    }

    change = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    addNew = () => {
        if(this.state.firstName === "" || this.state.surName === "" || this.state.country === "" || this.state.owner === "") {
            console.log('one or more fields are empty')
            return
        }
        this.props.addNewClient(this.state.firstName, this.state.surName, this.state.country, this.state.owner)
    }

    render() {
        return (
            <div className="add-client">
                <div>
                    <span>First name: </span>
                    <input id="firstName" type="text" onChange={this.change} value={this.state.firstName} />
                </div>
                <div>
                    <span>Surname: </span>
                    <input id="surName" type="text" onChange={this.change} value={this.state.surName} />
                </div>
                <div>
                    <span>Country: </span>
                    <input id="country" type="text" onChange={this.change} value={this.state.country} />
                </div>
                <div>
                    <span>Owner: </span>
                    <select id="owner" onChange={this.change}>
                        {this.populateOwners()}
                    </select>
                </div>
                <button className="add-btn" onClick={this.addNew}>Add New Client</button>
            </div>
        );
    }
}

export default AddClient;
