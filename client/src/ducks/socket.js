import io from 'socket.io-client';
import { onFotoStart, onFotoFinish, onFotoTransfer } from './photo/action';
import { onSensor } from './temperature/action';

const SOCKET_URI = 'wss://ivan-pi.herokuapp.com';

export function createSocket() {
    return io(SOCKET_URI, {
        transportOptions: {
            polling: {
              extraHeaders: {
                'authorization': localStorage.getItem('auth')
              }
            }
          }
    });
}

export function listenSocket(onData) {
    return dispatch => {
        const socket = createSocket();

        socket.on('connect', () => console.log(socket.id));
        socket.on('photo:start', onFotoStart(dispatch));
        socket.on('photo', onFotoTransfer(dispatch));
        socket.on('photo:finish', onFotoFinish(dispatch));
        socket.on('video:data', data => {
            onData(data);
            console.log('video:data', data);
        });
        socket.on('sensor', onSensor(dispatch));
    };
}