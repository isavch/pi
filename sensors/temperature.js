var sensor = require('node-dht-sensor');

console.log('Starting temperature sensor....')

const readTemperature = () => {
    sensor.read(11, 3, function(err, temperature, humidity) {
        if (err) {
            console.log('Error!', err.message);
            return;
        }
    
        process.send({ 
            type: 'temperature', 
            payload: { 
                temperature, 
                humidity, 
                date: Date.now() 
            } 
        });
    })
};

setInterval(readTemperature, 10000);
