import { LOGIN_SUCCESS, LOGIN_FAIL } from "./action";

export default function todos(state = [], { type, payload }) {
    switch(type) {
        case LOGIN_SUCCESS:
            return {
                token: payload,
                error: null
            };
        case LOGIN_FAIL:
            return {
                token: null,
                error: payload
            }
        default:
            return state;
    }
};