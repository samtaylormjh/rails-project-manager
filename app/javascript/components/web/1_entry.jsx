import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./rootReducer";
import promise from "redux-promise-middleware";
import App from "./app";
import toastr from "toastr";

import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/toastr.scss";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, applyMiddleware(promise));

export default function Entry() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
