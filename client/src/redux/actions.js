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

// Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: types.CLEAR_PROFILE });
    dispatch(getProfileRequest()); // loading = true
    try {
        const res = await axios.get("/api/profile");
        dispatch({ type: types.GET_PROFILES, payload: res.data });
    } catch (error) {
        dispatch(getProfileFailure(error));
        dispatch(setAlert(error.response.statusText, "danger"));
    }
};

// Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
    dispatch(getProfileRequest()); // loading = true
    try {
        const res = await axios.get(`/api/profile/${userId}`);
        dispatch(getProfileSuccess(res.data));
    } catch (error) {
        dispatch(getProfileFailure(error));
        dispatch(setAlert(error.response.statusText, "danger"));
    }
};

// Get GitHub repos
export const getGithubRepos = (username) => async (dispatch) => {
    dispatch(getProfileRequest()); // loading = true
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({ type: types.GET_REPOS, payload: res.data });
    } catch (error) {
        dispatch(getProfileFailure(error));
        dispatch(setAlert(error.response.statusText, "danger"));
    }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
    dispatch
) => {
    dispatch(getProfileRequest());
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.post("/api/profile", formData, config);
        dispatch(getProfileSuccess(res.data));
        dispatch(setAlert(`Profile ${edit ? "Upd" : "Cre"}ated`, "success"));
        if (!edit) {
            history.push("/dashboard");
        }
    } catch (error) {
        const errors = error.response.data.errors;
        console.error("Something went wrong");
        if (errors) {
            // Show alerts
            errors.forEach(({ msg }) => dispatch(setAlert(msg, "danger")));
        }
        dispatch(getProfileFailure(error));
    }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.put(
            "/api/profile/experience",
            formData,
            config
        );
        dispatch({ type: types.UPDATE_PROFILE, payload: res.data });

        dispatch(setAlert("Experience added", "success"));

        history.push("/dashboard");
    } catch (error) {
        const errors = error.response.data.errors;
        console.error("Something went wrong");
        if (errors) {
            // Show alerts
            errors.forEach(({ msg }) => dispatch(setAlert(msg, "danger")));
        }
        dispatch(getProfileFailure(error));
    }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.put("/api/profile/education", formData, config);
        dispatch({ type: types.UPDATE_PROFILE, payload: res.data });

        dispatch(setAlert("Education added", "success"));

        history.push("/dashboard");
    } catch (error) {
        const errors = error.response.data.errors;
        console.error("Something went wrong");
        if (errors) {
            // Show alerts
            errors.forEach(({ msg }) => dispatch(setAlert(msg, "danger")));
        }
        dispatch(getProfileFailure(error));
    }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
    try {
        console.log("delete Experience");
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({ type: types.UPDATE_PROFILE, payload: res.data });
        dispatch(setAlert("Experience removed", "success"));
    } catch (error) {
        dispatch(getProfileFailure(error));
    }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        console.log(res);
        dispatch({ type: types.UPDATE_PROFILE, payload: res.data });
        dispatch(setAlert("Education removed", "success"));
    } catch (error) {
        dispatch(getProfileFailure(error));
    }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
        try {
            await axios.delete(`/api/profile`);
            dispatch({ type: types.CLEAR_PROFILE });
            dispatch({ type: types.DELETE_ACCOUNT });
            dispatch(setAlert("Your accout has been permanantly deleted"));
        } catch (error) {
            dispatch(getProfileFailure(error));
        }
    }
};
