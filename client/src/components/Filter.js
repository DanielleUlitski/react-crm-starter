import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
@inject(allStores => ({
    applyFilter: allStores.clients.applyFilter
}))
@observer
class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            sFilter: "name",
        }
    }

    change = (e) => {
        debugger;
        this.setState({ [e.target.id]: e.target.value }, ()=>{
            this.props.applyFilter(this.state.sFilter, this.state.filter);
            this.props.filter();
        });
    }

    genSFilter = () => {
        let arr = ["Name", "Sold", "Email", "Owner", "Country"];
        return arr.map(f => {
            return <option value={f.toLowerCase()}>{f}</option>
        })
    }

    render() {
        return (
            <div className="filter">
                <input id="filter" type="text" onChange={this.change} value={this.state.filter} />
                <select id="sFilter" onChange={this.change}>
                    {this.genSFilter()}
                </select>
            </div>
        );
    }
}

export default Filter;