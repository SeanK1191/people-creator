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

    refreshPeople = (refreshPage = false) => {
        if (refreshPage === true) {
            window.location.reload(false); 
        }
        GetPeople().then((people) => {
            this.setState({
                people: people
            });
        }).catch((result) => {
            console.log(result);
            setTimeout(() => { this.refreshPeople(true) }, 1000);
        });;
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

    deleteUser = (personId) => {
        fetch(`${global.config.apiUrl}/people/${personId}`, {
            method: 'DELETE'
        }).then((result) => {
            console.log(result);
            this.refreshPeople();
        })
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
                            deleteUser={this.deleteUser} />
                    </div>
                    <UserCreationForm refreshPeople={this.refreshPeople} />
                </div>
            </div>
        );
    }
}

export default App;
