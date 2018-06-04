import { SENSOR_DATA } from './action';

export default function todos(state = [], { type, payload }) {
    switch (type) {
        case SENSOR_DATA:
            return {
                ...state, 
                ...payload.payload
            };
        default:
            return state;
    };
};