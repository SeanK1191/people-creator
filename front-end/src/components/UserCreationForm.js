import React, { Component } from 'react';

class UserCreationForm extends Component {
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

    createPerson = () => {
        fetch(`${global.config.apiUrl}/people`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((result) => {
            console.log(result);
            this.refreshPeople();
        })
    }

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
            <div style={{ marginTop: 50 }}>
                <span>User Creation Form</span>
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

export default UserCreationForm;