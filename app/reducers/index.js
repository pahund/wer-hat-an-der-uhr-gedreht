import { combineReducers } from "redux";
import counter from "./counter";
import journal from "./journal";

const rootReducer = combineReducers({
    counter,
    journal
});

export default rootReducer;
