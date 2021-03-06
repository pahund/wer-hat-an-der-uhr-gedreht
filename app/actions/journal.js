/*
 * action types
 */

export const ADD_ENTRY = "ADD_ENTRY";
export const COMPLETE_ENTRY = "COMPLETE_ENTRY";
export const SET_FILTER = "SET_FILTER";

/*
 * other constants
 */

export const FilterType = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_COMPLETED: "SHOW_COMPLETED",
    SHOW_ACTIVE: "SHOW_ACTIVE"
};

/*
 * action creators
 */

export function addEntry(date, description) {
    return { type: ADD_ENTRY, date, description };
}

export function completeEntry(index) {
    return { type: COMPLETE_ENTRY, index };
}

export function setFilter(filter) {
    return { type: SET_FILTER, filter };
}
