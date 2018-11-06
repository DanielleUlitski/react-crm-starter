import React, { Component } from 'react';
import { inject } from 'mobx-react';
@inject('clients')
class AutoComplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            inp: "",
            show: false,
            matches: [],
        }
    }

    componentDidMount() {
        this.setState({ arr: this.props.clients.clients.map(c => c.name) })
    }

    change = (e) => {
        this.setState({ [e.target.id]: e.target.value }, this.getMatches())
    }

    getMatches = () => {
        let matches = [];
        this.state.arr.map(i => {
            if (this.state.inp === i) {
                matches.splice(0);
                return null
            }
            if (i.toUpperCase().includes(this.state.inp.toUpperCase())) {
                matches.push(i)
                return i
            }
            return null
        })

        this.setState({ matches })
    }

    show = () => {
        this.setState({ show: true });
    }

    hide = () => {
        this.setState({ show: false })
    }

    select = (e) => {
        let temp = e.currentTarget.innerText
        this.setState({ inp: temp }, () => {
            if (this.props.validate(temp)) this.hide()
        })
    }

    check = () => {
        if (this.props.validate(this.state.inp)) {
            this.hide()
        }
    }

    validatekey = (e) => {
        if(e.keyCode === 13) {
            if(this.props.validate(this.state.matches[0])) {
                this.setState({ inp: this.state.matches[0] })
                this.hide();
            }
        }
    }

    render() {
        return (
            <div className="autoComplete">
                <input onKeyDown={this.validatekey} onFocus={this.show} id="inp" type="text" placeholder="Client Name" value={this.state.inp} onChange={this.change} />
                <ul style={(this.state.show) ? { "visibility": "visible" } : { "visibility": "hidden" }} className="auto-completer">
                    {this.state.matches.map(i => {
                        return (
                            <li onClick={this.select} key={i}>
                                {i}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default AutoComplete;