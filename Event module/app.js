const EventEmitter= require('events');
const emitter= new EventEmitter();

const logger= require('./logger.js')

//remote logging service- listens to the logging event
emitter.on('logging', function(eventArgs){
    console.log("Listener called");
    logger(eventArgs);
    
    
});

message= "This is message to send to remote service- inside logger module"

emitter.emit('logging',message);

