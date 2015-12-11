import { combineReducers } from "redux";
import counter from "./counter";
import entries from "./entries";
import filter from "./filter";

const rootReducer = combineReducers({
    counter,
    entries,
    filter
});

export default rootReducer;
