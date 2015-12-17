import { combineReducers } from "redux";
import entries from "./entries";
import filter from "./filter";

export default combineReducers({
    entries,
    filter
});
