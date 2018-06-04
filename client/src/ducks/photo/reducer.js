import { FOTO_START, FOTO_FINISH, FOTO_TRANSFER } from './action';

export default function todos(state = [], { type, payload }) {
    switch (type) {
        case FOTO_START:
            return {
                ...state, 
                isStarted: true, 
                buffer: []
            };
        case FOTO_TRANSFER:
            if (!state.isStarted) {
                return state;
            }

            return {
                ...state,
                buffer: [...state.buffer, payload]
            };
        case FOTO_FINISH:
            if (!state.isStarted) {
                return state;
            }
            const blob = new Blob(state.buffer, {type: "image/jpg"});

            return {
                isStarted: false,
                buffer: [],
                blob: window.URL.createObjectURL(blob)
            };
        default:
            return state;
    };
};