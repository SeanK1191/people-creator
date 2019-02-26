/* eslint-disable no-restricted-globals */
console.log('My custom service worker')

let selectedPeople = [];

// Install Service Worker
self.addEventListener('install', function(event){
    console.log('installed!');
    event.waitUntil(self.skipWaiting());
});

// Service Worker Active
self.addEventListener('activate', function(event){
    console.log('activated!');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('message', function(event){
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
