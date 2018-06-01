var sensor = require('node-dht-sensor');

console.log('Starting....')

if (!sensor.initialize(11, 3)) {
    console.warn('Failed to initialize sensor');
    process.exit(1);
}

sensor.read(11, 3, function(err, temperature, humidity) {
    if (err) {
        console.log('Error!', err.message)
        process.exit();
    }

    console.log('temp: ', temperature.toFixed(1),'°C, ', 'humidity: ', humidity.toFixed(1), '%');
});