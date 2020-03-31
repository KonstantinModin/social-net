import * as types from "./constants";
import axios from "axios";
import uuid from "uuid/v4";

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
    const id = uuid();
    dispatch({
        type: types.SET_ALERT,
        payload: {
            id,
            msg,
            type: alertType
        }
    });
    setTimeout(() => dispatch(removeAlert(id)), timeout);
};

const removeAlert = id => {
    return {
        type: types.REMOVE_ALERT,
        payload: id
    };
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post("/api/users", body, config);
        dispatch(registerSuccess(res.data));
    } catch (err) {
        const error = err.response.data.errors
        console.error("Something went wrong");
        dispatch(registerFail(error));
        dispatch(setAlert)
    }
};

const registerSuccess = payload => {
    return {
        type: types.REGISTER_SUCCESS,
        payload
    };
};

const registerFail = payload => {
    return {
        type: types.REGISTER_SUCCESS,
        payload
    };
};
