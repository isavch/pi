export const SENSOR_DATA = 'SENSOR_DATA';

export function onSensor(dispatch) {
    return payload => {
        console.log('sensor data::', payload);
        dispatch({
            type: SENSOR_DATA,
            payload
        });
    };
}