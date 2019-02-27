import { getSelectedPeople } from '../utils/serviceWorkerMessenger'

const getPeople = () => {
    return navigator.serviceWorker.ready.then(() => {
        return fetch('https://tech-test.azurewebsites.net/people', {
        headers: {
            'Content-Type': 'application/json'
        }
        }).then((response) => {
            return response.json();
        }).then((people) => {
            return getSelectedPeople().then((selectedPeople) => {
                return people.map((person) => {
                    person.selected = selectedPeople.find((element) => {
                        return element.Id === person.Id;
                    });
                    return person;
                });
            });
        });
    });
    
}

export default getPeople;