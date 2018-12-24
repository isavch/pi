export default login;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

function login(password) {
    return async dispatch => {
        const res = await fetch('/api/login', { headers: { Authorization: btoa(password)} })

        if (res.status === 200) {
            localStorage.setItem('auth', btoa(password))
            return dispatch({
                type: LOGIN_SUCCESS,
                payload: btoa(password)
            });
        }

        return dispatch({
            type: LOGIN_FAIL,
            payload: 'Wrong password'
        });
    };
}