import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            country: ""
        }
    }

    componentDidMount = () => {
        this.setState(
            {
                name: this.props.client.name.split(" ")[0],
                surname: this.props.client.name.split(" ")[1],
                country: this.props.client.country
            })
    }

    closeOnBackground = (e) => {
        if (e.target.className === 'modal') {
            this.props.hideModal(e);
        }
        e.stopPropagation()
    }

    edit = (e) => {
        this.props.edit(this.state.name, this.state.surname, this.state.country);
        this.props.hideModal(e);
        e.stopPropagation()
    }

    update = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    hideModal = (e) => {
        this.props.hideModal(e);
        e.stopPropagation()
    }

    render() {
        return (
            <span>
                <div className="modal" style={{ display: this.props.display }} onClick={this.closeOnBackground}>
                    <div className="form-group">
                        <span className="modal-close" onClick={this.hideModal}>x</span>
                        <form>
                            <div className="form-input"><span>Name:</span><input id="name" type="text" value={this.state.name} onChange={this.update} /></div>
                            <div className="form-input"><span>Surname:</span><input id="surname" type="text" value={this.state.surname} onChange={this.update} /></div>
                            <div className="form-input"><span>Country:</span><input id="country" type="text" value={this.state.country} onChange={this.update} /></div>
                        </form>
                        <button className="update-btn" onClick={this.edit}>Update</button>
                    </div>
                </div>
            </span>
        );
    }

}

export default Editor;
