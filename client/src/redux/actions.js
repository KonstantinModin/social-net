import * as types from "./constants";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { v4 as uuid } from "uuid";

// Alerts
export const setAlert = (msg, alertType, timeout = 3000) => (dispatch) => {
    const id = uuid();
    dispatch({
        type: types.SET_ALERT,
        payload: {
            id,
            msg,
            type: alertType,
        },
    });
    setTimeout(() => dispatch(removeAlert(id)), timeout);
};

const removeAlert = (id) => {
    return {
        type: types.REMOVE_ALERT,
        payload: id,
    };
};

const setAuthLoadingToTrue = () => {
    return {
        type: types.SET_AUTH_LOADING_TRUE,
    };
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
    dispatch(setAuthLoadingToTrue());
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post("/api/users", body, config);
        dispatch(registerSuccess(res.data));
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        console.error("Something went wrong");
        if (errors) {
            // Show alerts
            errors.forEach(({ msg }) => dispatch(setAlert(msg, "danger")));
        }
        dispatch(registerFail(errors));
    }
};

const registerSuccess = (payload) => {
    return {
        type: types.REGISTER_SUCCESS,
        payload,
    };
};

const registerFail = (payload) => {
    return {
        type: types.REGISTER_FAIL,
        payload,
    };
};

// Load User
export const loadUser = () => async (dispatch) => {
    dispatch(setAuthLoadingToTrue());
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get("/api/auth");
        dispatch(userLoaded(res.data));
    } catch (error) {
        console.error("Something went wrong");
        dispatch(authError(error));
    }
};

const userLoaded = (payload) => {
    return {
        type: types.USER_LOADED,
        payload,
    };
};

const authError = (payload) => {
    return {
        type: types.AUTH_ERROR,
        payload,
    };
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
    dispatch(setAuthLoadingToTrue());
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post("/api/auth", body, config);
        dispatch(loginSuccess(res.data));
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        console.error("Something went wrong");
        if (errors) {
            // Show alerts
            errors.forEach(({ msg }) => dispatch(setAlert(msg, "danger")));
        }
        dispatch(loginFail(errors));
    }
};

const loginSuccess = (payload) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload,
    };
};

const loginFail = (payload) => {
    return {
        type: types.LOGIN_FAIL,
        payload,
    };
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
    dispatch({ type: types.CLEAR_PROFILE });
    dispatch({ type: types.LOGOUT });
};

// Profile
// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
    dispatch(getProfileRequest());
    try {
        const res = await axios.get("/api/profile/me");
        dispatch(getProfileSuccess(res.data));
    } catch (error) {
        dispatch(getProfileFailure(error));
        dispatch(setAlert(error.response.statusText, "danger"));
    }
};

const getProfileRequest = () => {
    return {
        type: types.GET_PROFILE_REQUEST,
    };
};

const getProfileSuccess = (payload) => {
    return {
        type: types.GET_PROFILE_SUCCESS,
        payload,
    };
};

const getProfileFailure = (payload) => {
    return {
        type: types.GET_PROFILE_FAILURE,
        payload,
    };
};
