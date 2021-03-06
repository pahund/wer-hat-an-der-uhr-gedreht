import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "../actions/counter";

export default (state = 0, action = null) => {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return state + 1;
        case DECREMENT_COUNTER:
            return state - 1;
        default:
            return state;
    }
};
