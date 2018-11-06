import React, { Component } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { observer, inject } from 'mobx-react';

@inject(allStores => ({
    owners: allStores.clients.owners
}))
@observer
class TopEmployees extends Component {

    calcTop3 = () => {
        let bestSellers = [];
        let temp = "";
        let owners = { ...this.props.owners }
        let names = Object.keys(owners);
        let c = 0;
        while (bestSellers.length < 3) {
            for (let i of names) {
                if (owners[i] > c) {
                    c = owners[i];
                    temp = i;
                }
            }
            bestSellers.push({ name: temp, sales: c });
            c = 0;
            owners[temp] = 0;
            temp = "";
        }
        return bestSellers;
    }

    render() {
        return (
            <div className="top-employees">
                <h3>Top Employees</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={this.calcTop3()}
                        layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#00035F" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default TopEmployees;