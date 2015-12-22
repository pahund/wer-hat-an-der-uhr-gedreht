import { ADD_ENTRY, COMPLETE_ENTRY } from "../../actions/journal";

export default (state = [], action = null) => {
    switch (action.type) {
        case ADD_ENTRY:
            return [
                ...state,
                {
                    date: action.date,
                    description: action.description,
                    completed: false
                }
            ];
        case COMPLETE_ENTRY:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ];
        default:
            return state;
    }
};
