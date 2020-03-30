import * as types from "./constants";
import uuid from "uuid";

export const setAlert = (msg, alertType) => {
    const id = uuid.v4();
    return {
        type: types.SET_ALERT,
        payload: {
            id,
            msg,
            alertType
        }
    };
};
