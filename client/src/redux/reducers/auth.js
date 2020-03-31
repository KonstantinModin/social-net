import * as types from "../constants";

const INITIAL_STATE = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null
};

const auth = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case types.REGISTER_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...payload,
                isAuthenticated: true,
                loading: false,
                error: false
            };
        case types.REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: payload
            };
        default:
            return state;
    }
};

export default auth;
