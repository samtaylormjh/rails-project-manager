import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./rootReducer";
import promise from "redux-promise-middleware";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./app";

const store = createStore(reducers, applyMiddleware(promise));

export default function Entry() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
