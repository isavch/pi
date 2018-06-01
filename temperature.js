var sensor = require('node-dht-sensor');

console.log('Starting....')

// sensor.read(22, 2, function(err, temperature, humidity) {
//     if (err) {
//         console.log('Error!', err.message)
//         process.exit();
//     }

//     console.log('temp: ', temperature.toFixed(1),'°C, ', 'humidity: ', humidity.toFixed(1), '%');
// });

var rpiDhtSensor = require('rpi-dht-sensor');

var dht = new rpiDhtSensor.DHT22(2);

function read () {
  var readout = dht.read();

    console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
        'humidity: ' + readout.humidity.toFixed(2) + '%');
    setTimeout(read, 5000);
}
read();