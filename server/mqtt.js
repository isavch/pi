const mqtt = require('mqtt');
const url = require('url');

const mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
const [username, password] = (mqtt_url.auth || ':').split(':');

var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, { username, password });

client.on('connect', function() {

  client.subscribe('hello/world', function() {

    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });


  client.publish('hello/world', 'my message', function() {
    console.log("Message is published");
    client.end(); // Close the connection when published
  });
});

module.exports = client