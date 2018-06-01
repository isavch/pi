var sensor = require('node-dht-sensor');

console.log('Starting....')

sensor.read(22, 2, function(err, temperature, humidity) {
    if (err) {
        console.log('Error!', err.message)
        process.exit();
    }

    console.log('temp: ', temperature.toFixed(1),'°C, ', 'humidity: ', humidity.toFixed(1), '%');
});