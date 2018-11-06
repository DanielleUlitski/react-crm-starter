import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { observer, inject } from 'mobx-react';

@inject(allStores => ({
    clients: allStores.clients.clients
}))
@observer
class SalesSince extends Component {

    calcData = () => {
        let data = [];
        let dataobj = {};
        let today = new Date();
        let startingDate = new Date();
        startingDate.setDate(today.getDate() - 30);
        if (this.props.clients.data) {
            return
        }
        let dates = this.props.clients.filter(c => {
            return new Date(c.firstContact).getTime() >= startingDate.getTime() && c.sold && new Date(c.firstContact).getTime() <= today.getTime();
        }).sort((a, b) => {
            return new Date(a.firstContact).getTime() - new Date(b.firstContact).getTime()
        }).map(c => {
            return { date: new Date(c.firstContact).toLocaleString('en-us', { month: 'short', day: '2-digit' }) };
        })
        for (let i of dates) {
            if (dataobj[i.date]) {
                dataobj[i.date] ++;
            } else {
                dataobj[i.date] = 1;
            }
        }
        for (let i of Object.keys(dataobj)) {
            data.push({ date: i, sales: dataobj[i] });
        }
        return data;
    }

    calcDate = () => {
        let today = new Date();
        today.setDate(today.getDate() - 30);
        return today.toLocaleString('us-en', { month: "short", day: "2-digit" });
    }

    render() {
        return (
            <div className="sales-since">
                <h3>Sales Since {this.calcDate()}</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={this.calcData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="#C14A24" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default SalesSince;