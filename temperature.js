var sensor = require('node-dht-sensor');

console.log('Starting....')

sensor.read(11, 3, function(err, temperature, humidity) {
    if (!err) {
        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
            'humidity: ' + humidity.toFixed(1) + '%'
        );
    }
});