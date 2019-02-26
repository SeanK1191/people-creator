/* eslint-disable no-restricted-globals */
console.log('My custom service worker')

let selectedPeople = [];

// Install Service Worker
self.addEventListener('install', function(event){
    console.log('installed!');
});

// Service Worker Active
self.addEventListener('activate', function(event){
    console.log('activated!');
});

self.addEventListener('message', function(event){
    console.log("SW Received Message");

    if(event.data.eventType === 'personSelected') {
        selectedPeople.push(event.data.person);
    }

    if(event.data.eventType === 'personUnselected') {
        selectedPeople = selectedPeople.filter((element) => {
            return element.Id !== event.data.person.Id;
        });
    }

    if(event.data.eventType === 'getSelectedPeople') {
        event.ports[0].postMessage(selectedPeople);
    }
    
});
