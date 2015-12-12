import { TEXTFIELD_EMPTY, TEXTFIELD_FILLED } from "../../actions/journal";

export default (state = true, action = null) => {
    switch (action.type) {
        case TEXTFIELD_EMPTY:
            return true;
        case TEXTFIELD_FILLED:
            return false;
        default:
            return state;
    }
};
