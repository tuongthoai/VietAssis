
// use redux slice ----------------------------------------------------------------------------------------
import { configureStore } from "@reduxjs/toolkit";
import chatHistoryReducer from "./slice";

export const store = configureStore({
    reducer: {
        chatHistory: chatHistoryReducer,
    }
});


// normal way of using redux ----------------------------------------------------------------------------------------

// import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
// import reduxThunk, { thunk } from 'redux-thunk'

// const rootReducer = combineReducers({});

// export const store = legacy_createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(thunk),
//         window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
//     )
// );