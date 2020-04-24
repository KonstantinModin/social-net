import * as types from "../constants";

const INITIAL_STATE = {
    profile: null,
    profiles: [],
    repos: [],
    loading: false,
    error: null,
};

const profile = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case types.GET_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case types.GET_PROFILE_SUCCESS:
        case types.UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
                error: null,
            };
        case types.GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false,
            };

        case types.GET_PROFILE_FAILURE:
            return {
                ...state,
                profile: null,
                loading: false,
                error: payload,
            };
        case types.CLEAR_PROFILE:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export default profile;
