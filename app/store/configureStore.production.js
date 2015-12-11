import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const finalCreateStore = compose(applyMiddleware(thunk))(createStore);

export default initialState => finalCreateStore(rootReducer, initialState);
