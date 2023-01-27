import {
    START_FETCHING_PARTICIPANTS,
    SUCCESS_FETCHING_PARTICIPANTS,
    ERROR_FETCHING_PARTICIPANTS,
} from "./constants";

import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";

let debouncedFetchParticipants = debounce(getData, 1000);

// START
export const startFetchingParticipants = () => {
    return {
        type: START_FETCHING_PARTICIPANTS,
    };
};

// SUCCESS
export const successFetchingParticipants = ({ participants }) => {
    return {
        type: SUCCESS_FETCHING_PARTICIPANTS,
        participants,
    };
};

export const errorFetchingParticipants = () => {
    return {
        type: ERROR_FETCHING_PARTICIPANTS,
    };
};

export const fetchParticipants = () => {
    return async (dispatch) => {
        dispatch(startFetchingParticipants());

        try {
            setTimeout(() => {
                dispatch(clearNotif());
            }, 3000);

            let res = await debouncedFetchParticipants("/participants");

            dispatch(
                successFetchingParticipants({
                    participants: res.data.data,
                })
            );
        } catch (error) {
            dispatch(errorFetchingParticipants());
        }
    };
};
