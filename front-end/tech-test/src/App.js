import React, { Component } from 'react';
import './App.css';
import { getSelectedPeople, sendPersonSelectedMessage, sendPersonUnselectedMessage } from './utils/serviceWorkerMessenger'
import PeopleTable from './PeopleTable'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: undefined
        }
    }

    componentDidMount() {
        fetch('https://tech-test.azurewebsites.net/people', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((result) => {
            getSelectedPeople().then((selectedPeople) => {
                this.setState({
                    people: result.map((person) => {
                        person.selected = selectedPeople.find((element) => {
                            return element.Id === person.Id;
                        });
                        return person;
                    })
                })
            });
        });
    }

    personSelected = (person) => {
        sendPersonSelectedMessage(person).then((result) => {
            let previousState  = Object.assign({}, this.state);
            let people = previousState.people;
            let unselectedPerson = people.find((p) => p.Id === person.Id);
            unselectedPerson.selected = true;
            this.setState({
                people: people
            })
        })
    }

    personUnselected = (person) => {
        console.log(this.state);

        sendPersonUnselectedMessage(person).then((result) => {
            let previousState  = Object.assign({}, this.state);
            let people = previousState.people;
            let unselectedPerson = people.find((p) => p.Id === person.Id);
            unselectedPerson.selected = false;
            this.setState({
                people: people
            })
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div>Tech Test</div>
                </header>
                <PeopleTable people={this.state.people} personSelected={this.personSelected} personUnselected={this.personUnselected} />
            </div>
        );
    }
}

export default App;
