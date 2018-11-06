import React, { Component } from 'react';

class Badge extends Component {
  render() {
    return (
      <img src={this.props.src} className="badge" id={this.props.id} />
    );
  }
}

export default Badge;