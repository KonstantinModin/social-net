import * as types from "../constants";

const INITIAL_STATE = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
};

const auth = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...payload,
                isAuthenticated: false,
                loading: false,
                error: false
            };
        case types.REGISTER_FAIL:
        case types.AUTH_ERROR:
        case types.LOGIN_FAIL:
        case types.LOGOUT:
            localStorage.removeItem("token");
            return {
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: payload
            };
        case types.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };

        default:
            return state;
    }
};

export default auth;
