import { combineReducers } from "redux";
import entries from "./entries";
import filter from "./filter";
import submitDisabled from "./submitDisabled";

export default combineReducers({
    entries,
    filter,
    submitDisabled
});
