import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <thead className="header">
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Country</th>
                    <th>First Contact</th>
                    <th>Email</th>
                    <th>Sold</th>
                    <th>Owner</th>
                </tr>
            </thead>
        );
    }
}

export default Header;
