import { combineReducers } from "redux";
import counter from "./counter";
import entries from "./journal/entries";
import filter from "./journal/filter";

const rootReducer = combineReducers({
    counter,
    entries,
    filter
});

export default rootReducer;
