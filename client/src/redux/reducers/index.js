import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import quizReducer from './quiz.reducer';
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const root = combineReducers({
    quizReducer: quizReducer
});

const store = createStore(
    root,
    storeEnhancers(applyMiddleware(thunk))
);

export default store;
