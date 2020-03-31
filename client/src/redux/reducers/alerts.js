import * as types from "../constants";

const alerts = (state = [], { type, payload }) => {
    switch (type) {
        case types.SET_ALERT:
            return [...state, payload];
        case types.REMOVE_ALERT:
            return state.filter(({ id }) => id !== payload);
        default:
            return state;
    }
};

export default alerts;
