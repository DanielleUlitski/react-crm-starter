import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Badge from './Badge';

@inject(allStores => ({
    countries: allStores.clients.countries
}))
@observer
class BestSeller extends Component {

    bestSeller = () => {
        let countries = Object.keys(this.props.countries);
        let bestSeller = { country: "", n: 0 }
        for (let country of countries) {
            if (this.props.countries[country] > bestSeller.n) {
                bestSeller.n = this.props.countries[country];
                bestSeller.country = country
            }
        }
        return bestSeller.country
    }

    render() {
        return (
            <div>
                <Badge src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpEmb5HCdTTqYquHLosBp6QaC-tnbX1sZXwUovkqu-hOpUlMhz" />
                <span className="number" >{this.bestSeller()}</span><br />
                <span className="description-of-number">Hottest Country</span>
            </div>
        );
    }
}

export default BestSeller;