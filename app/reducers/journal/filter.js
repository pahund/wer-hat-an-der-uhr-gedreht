import { SET_FILTER, FilterType } from "../../actions/journal";
const { SHOW_ALL } = FilterType;

export default (state = SHOW_ALL, action = null) => {
    switch (action.type) {
        case SET_FILTER:
            return action.filter;
        default:
            return state;
    }
};
