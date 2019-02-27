import React, { Component } from 'react';
import './App.css';
import { getSelectedPeople, sendPersonSelectedMessage, sendPersonUnselectedMessage } from './utils/serviceWorkerMessenger'
import PeopleTable from './components/PeopleTable'
import UserCreationForm from './components/UserCreationForm'
import GetPeople from './actions/getPeople'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: undefined,
            sortedBy: 'name',
            sortedDescending: false,
            skip: 0,
            take: 10
        }
    }

    componentDidMount() {
        this.refreshPeople();
    }

    /// This works as the initial get of all people and for refreshing the table after additions and deletions
    refreshPeople = (refreshPage = false) => {
        if (refreshPage === true) {
            window.location.reload(false); 
        }
        GetPeople().then((people) => {
            this.setState({
                people: people
            });
        }).catch((result) => {
            /// Service worker controller either hasn't registered yet or won't register (Hard refresh) so start over again and refresh page just to be safe 
            console.log(result);
            setTimeout(() => { this.refreshPeople(true) }, 1000);
        });;
    }

    /// Component handler for marking a person as selected using utility method from serviceWorkerMessenger
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

    /// Component handler for marking a person as selected using utility method from serviceWorkerMessenger
    personUnselected = (person) => {
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

    /// Make call to get people but with sorting parameters, use whatever skip and take were set last
    sortPeople = (sortBy) => {
        const sortDescending = this.state.sortedDescending === true ? false : true;

        fetch(`${global.config.apiUrl}/people?sortBy=${sortBy}&sortDescending=${sortDescending}&skip=${this.state.skip}&take=${this.state.take}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((result) => {
            getSelectedPeople().then((selectedPeople) => {
                this.setState(prevState => {
                    return {
                        people: result.map((person) => {
                            person.selected = selectedPeople.find((element) => {
                                return element.Id === person.Id;
                            });
                            return person;
                        }),
                        sortedBy: sortBy,
                        sortedDescending: prevState.sortedBy !== sortBy ? false : sortDescending
                    }
                });
            }).catch((result) => {
                console.log(result);
            });
        });
    }

    /// Get next 10 people
    pageForward = () => {
        const newSkip = this.state.skip + 10;

        fetch(`${global.config.apiUrl}/people?sortBy=${this.state.sortedBy}&sortDescending=${this.state.sortedDescending}&skip=${newSkip}&take=${this.state.take}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((result) => {
            getSelectedPeople().then((selectedPeople) => {
                this.setState(prevState => {
                    return {
                        people: result.map((person) => {
                            person.selected = selectedPeople.find((element) => {
                                return element.Id === person.Id;
                            });
                            return person;
                        }),
                        skip: newSkip
                    };
                });
            });
        });
    }

    /// Get last 10 people, do not allow the user to go back from 0
    pageBackward = () => {
        const newSkip = this.state.skip === 0 ? 0 : this.state.skip - 10;

        fetch(`${global.config.apiUrl}/people?sortBy=${this.state.sortedBy}&sortDescending=${this.state.sortedDescending}&skip=${newSkip}&take=${this.state.take}`, {
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
                    }),
                    skip: newSkip
                });
            });
        });
    }

    /// Delete a user and refresh the table
    deleteUser = (personId) => {
        fetch(`${global.config.apiUrl}/people/${personId}`, {
            method: 'DELETE'
        }).then((result) => {
            console.log(result);
            this.refreshPeople();
        })
    }

    /// Update a users details, don't refresh the table, if something goes wrong, handle it in the catch.
    updateUser = (personId) => {
        const personToUpdate = this.state.people.find(person => person.Id === personId);

        fetch(`${global.config.apiUrl}/people/${personId}`, {
            method: 'PUT',
            body: JSON.stringify(personToUpdate),
            headers: {
                "Content-Type": "application/json",
            }
        }).catch((result) => {
            console.log(result);
        });
    }

    /// Handle all values in the table being edited
    onTableEdited = (person, change) => {
        this.setState((previousState) => {
            const previousPeople = previousState.people;

            let indexOfPreviousPerson = 0;
            const previousPerson = previousPeople.find((element, index) => { 
                indexOfPreviousPerson = index;
                return element.Id === person.Id
            });

            const newPerson = Object.assign({}, previousPerson, change);
            previousPeople[indexOfPreviousPerson] = newPerson;

            return Object.assign({}, previousState);
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div>Tech Test</div>
                </header>
                <div style={{ display: 'flex' }}>
                    <div>
                        <PeopleTable 
                            people={this.state.people} 
                            personSelected={this.personSelected} 
                            personUnselected={this.personUnselected} 
                            sortPeople={this.sortPeople}
                            sortByEmail={this.sortByEmail} 
                            sortByName={this.sortByName} 
                            sortedBy={this.state.sortedBy}
                            sortedDescending={this.state.sortedDescending}
                            pageForward={this.pageForward} 
                            pageBackward={this.pageBackward}
                            deleteUser={this.deleteUser}
                            onTableEdited={this.onTableEdited}
                            updateUser={this.updateUser} />
                    </div>
                    <UserCreationForm refreshPeople={this.refreshPeople} />
                </div>
            </div>
        );
    }
}

export default App;
