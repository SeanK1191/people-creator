/// Ensure service worker is ready to be interacted with and then ask it for the cache of selected people
export const getSelectedPeople =  function () {
    return navigator.serviceWorker.ready.then(() => {
        return new Promise(function(resolve, reject){
            if(navigator.serviceWorker.controller) {
                // Create a Message Channel
                var messageChannel = new MessageChannel();
                    
                // Handler for recieving message reply from service worker
                messageChannel.port1.onmessage = function(event){
                    if(event.data.error){
                        reject(event.data.error);
                    }else{
                        resolve(event.data);
                    }
                };

                // Send message to service worker along with port for reply
                navigator.serviceWorker.controller.postMessage({
                    eventType: 'getSelectedPeople'
                }, [messageChannel.port2]);
            } else {
                reject('Controller not ready');
            }
            
        });
    });
}

/// Tell service worker a new person has been selected
export const sendPersonSelectedMessage = function(person) {
    return new Promise(function(resolve) {
        navigator.serviceWorker.controller.postMessage({
            eventType: 'personSelected',
            person: person
        });

        resolve('Message Sent');
    });
    
}

/// Tell service worker a person has been unselected
export const sendPersonUnselectedMessage = function(person) {
    return new Promise(function(resolve) {
        navigator.serviceWorker.controller.postMessage({
            eventType: 'personUnselected',
            person: person
        });

        resolve('Message Sent');
    });
}