export const getSelectedPeople =  function () {
    return navigator.serviceWorker.ready.then(() => {
        return new Promise(function(resolve, reject){
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
        });
    });
}

export const sendPersonSelectedMessage = function(person) {
    return new Promise(function(resolve) {
        navigator.serviceWorker.controller.postMessage({
            eventType: 'personSelected',
            person: person
        });

        resolve('Message Sent');
    });
    
}

export const sendPersonUnselectedMessage = function(person) {
    return new Promise(function(resolve) {
        navigator.serviceWorker.controller.postMessage({
            eventType: 'personUnselected',
            person: person
        });

        resolve('Message Sent');
    });
}