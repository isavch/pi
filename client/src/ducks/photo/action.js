import { createSocket } from '../socket';

export const FOTO_START = 'FOTO_START';
export const FOTO_TRANSFER = 'FOTO_TRANSFER';
export const FOTO_FINISH = 'FOTO_FINISH';
export const FOTO_TAKE = 'FOTO_TAKE';
export const VIDEO_TAKE = 'VIDEO_TAKE';
export const VIDEO_STOP = 'VIDEO_STOP';

export function takePhoto(options) {
    console.log('photo:take');
    const soket = createSocket();
    soket.emit('photo:take', options);

    return {
        type: FOTO_TAKE
    };
}

export function takeVideo(options) {
    console.log('video:take');
    const soket = createSocket();
    soket.emit('video:take', options);

    return {
        type: VIDEO_TAKE
    };
}

export function stopVideo() {
    console.log('video:stop');
    const soket = createSocket();
    soket.emit('video:stop');

    return {
        type: VIDEO_STOP
    };
}

export function onFotoStart(dispatch) {
    return ({ length }) => {
        console.log('...strarted::total', length);
        dispatch({ type: FOTO_START });
    };
}

export function onFotoTransfer(dispatch) {
    return data => {
        console.log('...transfering::', data.byteLength/1024), 'Kb';
        dispatch({ 
            type: FOTO_TRANSFER,
            payload: data
        });
    };
}

export function onFotoFinish(dispatch) {
    return () => {
        console.log('Foto transfer end!');
        dispatch({ type: FOTO_FINISH });
    };
}