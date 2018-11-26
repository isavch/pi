const { fork } = require('child_process');
const path = require('path');
const io = require('socket.io-client');
const ss = require('socket.io-stream');
const NALSeparator = new Buffer([0, 0, 0, 1]);
const Split = require('stream-split');
const socket = io(process.env.SOCKET_URI || 'wss://ivan-pi.herokuapp.com/');
const { spawn } = require('child_process');

const sensors = [
    'temperature.js',
    'motion.js'
];

const handleMessages = msg => socket.emit('sensor', msg);

const takePhoto = ({ width = 640, height = 320 }) => {
    return spawn('raspistill', [
        '-w', width, '-h', '-vf', '-hf', height, '-o', '-'
    ]);
};

const streamVideo = ({ width = 320, height = 320, fps = 25, bitrate = 500000 }) => {
    return spawn('raspivid', [
        '-n', '-t', '0', '-w', width.toString(), '-h', height.toString(), '-b', bitrate.toString(), '-pf', 'baseline', '-o', '-'
    ]);
};

socket.on('connect', () => console.log(socket.id, 'socket connected'));
socket.on('video:take', onTakeVideo);
socket.on('photo:take', onTakePhoto);

function onTakeVideo(options) {
    console.log('video start', options);
    const NALSplitter = new Split(NALSeparator);
    const video = streamVideo(options || {});
    socket.on('video:stop', () => {
        video.kill();
        socket.off('video:stop');
    });
    video.stdout.pipe(NALSplitter).on('data', data => socket.emit('video:data', data));
}

function onTakePhoto(options = {}) {
    const { interval = 0 } = options;
    const { stdout } = takePhoto(options);

    console.log('photo take...', options);
    socket.emit('photo:start', { length: stdout.readableLength });
    stdout.on('data', data => socket.emit('photo', data));
    stdout.on('finish', () => {
        socket.emit('photo:finish');

        if (interval) {
            setTimeout(() => onTakePhoto(options), interval);
        }
    });
}

sensors
    .map(sensor => fork(path.resolve(__dirname, sensor)))
    .forEach(sensorProcess => sensorProcess.on('message', handleMessages));
