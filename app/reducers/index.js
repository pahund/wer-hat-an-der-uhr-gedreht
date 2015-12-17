import { combineReducers } from "redux";
import counter from "./counter";
import journal from "./journal";
import { OPEN, NEW } from "../actions/file";
import { FilterType } from "../actions/journal";

const reducers = combineReducers({
    counter,
    journal
});

export default (state = {}, action = null) => {
    switch (action.type) {
        case OPEN:
            return action.data;
        case NEW:
            return {
                counter: 0,
                journal: {
                    entries: [],
                    filter: FilterType.SHOW_ALL
                }
            };
        default:
            return reducers(state, action);
    }
};
