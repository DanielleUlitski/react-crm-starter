import React, { Component } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { observer, inject } from 'mobx-react';

@inject("clients")
@observer
class SalesBy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: "Country"
        }
    }

    infoBasedDataGen = (info) => {
        let data = [];
        let types = Object.keys(info);
        for (let i of types) {
            data.push({ name: i, sales: info[i] });
        }
        return data;
    }

    generateFilter = () => {
        let arr = ["Country", "Owner", "EmailType"];
        return arr.map(k => {
            return <option value={k}>{k}</option>
        })
    }

    calcDataBySales = () => {
        let data = [];
        switch (this.state.current) {
            case "Country":
                data = this.infoBasedDataGen(this.props.clients.countries);
                break;
            case "Owner":
                data = this.infoBasedDataGen(this.props.clients.owners);
                break;
            case "EmailType":
                data = this.infoBasedDataGen(this.props.clients.emailTypeSales);
                break;
        }
        return data;
    }

    change = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return (
            <div className="sales-by">
                <h3>Sales By:
                    <select id="current" onChange={this.change} selected={this.state.current}>
                        {this.generateFilter()}
                    </select>
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={this.calcDataBySales()}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="category" dataKey="name" />
                        <YAxis type="number" />
                        <Tooltip />
                        <Legend  />
                        <Bar dataKey="sales" fill="#AF3A9F" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default SalesBy;