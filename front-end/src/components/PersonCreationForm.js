import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class PersonCreationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: '',
            Email: '',
            Address: '',
            Balance: 0,
            Age: 0
        }

        this.refreshPeople = props.refreshPeople;
    }

    /// Create a new person and refresh the table
    createPerson = () => {
        toast('Creating Person');
        fetch(`${global.config.apiUrl}/people`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((result) => {
            toast('Person Created');
            console.log(result);
            this.refreshPeople();
        })
    }

    /// Handle input from Person into form
    handleInput = (change) => {
        this.setState((previousState) => {
            return Object.assign({}, previousState, change);
        });
    }

    render() {
        const inputStyle = {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 5
        };

        return (
            <div style={{ marginTop: 50, marginLeft: 50 }}>
                <span id='formTitle'>Person Creation Form</span>
                <div>
                    <label style={inputStyle}>
                        Name:
                        <input onChange={event => this.handleInput({ Name: event.target.value })} style={{ marginLeft: 5 }} type="text" name="name" />
                    </label>
                    <label style={inputStyle}>
                        Email:
                        <input onChange={event => this.handleInput({ Email: event.target.value })} style={{ marginLeft: 5 }} type="text" name="email" />
                    </label>
                    <label style={inputStyle}>
                        Address:
                        <input onChange={event => this.handleInput({ Address: event.target.value })} style={{ marginLeft: 5 }} type="text" name="address" />
                    </label>
                    <label style={inputStyle}>
                        Balance:
                        <input onChange={event => this.handleInput({ Balance: event.target.value })} style={{ marginLeft: 5 }} type="number" name="balance" />
                    </label>
                    <label style={inputStyle}>
                        Age:
                        <input onChange={event => this.handleInput({ Age: event.target.value })} style={inputStyle} type="number" name="age" />
                    </label>
                    <input type="submit" name="name" onClick={this.createPerson} />
                </div>
            </div>
        );
    }
}

PersonCreationForm.propTypes = {
    refreshPeople: PropTypes.func.isRequired
};

export default PersonCreationForm;