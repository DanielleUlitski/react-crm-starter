import React, { Component } from 'react';
import Client from './Client'
import Header from './Header'
import Filter from './Filter'
import { observer, inject } from 'mobx-react';

@inject("clients")
@observer
class Clients extends Component {

    constructor() {
        super();
        this.state = {
            start: 0,
            end: 20,
        }
    }

    back = () => {
        if (this.state.start !== 0) {
            this.setState({ start: this.state.start - 20, end: this.state.end - 20 }, () => {
                this.props.clients.populateDisplayed(this.state.start, this.state.end);
            })
        }
    }

    forward = () => {
        if (this.state.end < this.props.clients.filteredClients.length) {
            this.setState({ start: this.state.start + 20, end: this.state.end + 20 }, () => {
                this.props.clients.populateDisplayed(this.state.start, this.state.end);
            })
        }
    }

    filter = () => {
        this.setState({ start: 0, end: 20 }, () => {
            this.props.clients.populateDisplayed(this.state.start, this.state.end);
        })
    }

    componentDidMount() {
        this.props.clients.populateClients(this.state.start, this.state.end, true);
    }

    loadClients = () => {
        return this.props.clients.displayedClients.map((c, i) => {
            return <Client min={this.state.start} max={this.state.end} key={c.id} client={c} index={i + this.state.start} />
        })
    }

    render() {
        return (
            <div className="Clients">
                <Filter filter={this.filter} />
                <div className='pagination'>
                    <input type='button' value='<' onClick={this.back} />
                    <span>{this.state.start + '-' + (this.state.end - 1)}</span>
                    <input type='button' value='>' onClick={this.forward} />
                </div>
                <table className="clientsTable">
                    <Header />
                    <tbody>
                        {this.loadClients()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Clients;
