import React, { Component } from 'react';
import './App.css';
import { getSelectedPeople, sendPersonSelectedMessage, sendPersonUnselectedMessage } from './utils/serviceWorkerMessenger'
import PeopleTable from './components/PeopleTable'

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

    sortPeople = (sortBy) => {
        const sortDescending = this.state.sortedDescending === true ? false : true;

        fetch(`https://tech-test.azurewebsites.net/people?sortBy=${sortBy}&sortDescending=${sortDescending}&skip=${this.state.skip}&take=${this.state.take}`, {
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
            });
        });
    }

    pageForward = () => {
        const newSkip = this.state.skip + 10;

        fetch(`https://tech-test.azurewebsites.net/people?sortBy=${this.state.sortedBy}&sortDescending=${this.state.sortedDescending}&skip=${newSkip}&take=${this.state.take}`, {
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

        fetch(`https://tech-test.azurewebsites.net/people?sortBy=${this.state.sortedBy}&sortDescending=${this.state.sortedDescending}&skip=${newSkip}&take=${this.state.take}`, {
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

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div>Tech Test</div>
                </header>
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
                    pageBackward={this.pageBackward} />
            </div>
        );
    }
}

export default App;
