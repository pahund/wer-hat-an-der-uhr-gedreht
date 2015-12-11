import { SET_FILTER, Filters } from "../actions/journal";
const { SHOW_ALL } = Filters

export default (state = SHOW_ALL, action = null) => {
    switch (action.type) {
        case SET_FILTER:
            return action.filter;
        default:
            return state;
    }
};
