import React from "react";
import ReactDOM from "react-dom";

import Entry from "components/web/1_entry";
import axios from "axios";

// CSRF
axios.defaults.headers.common["X-CSRF-Token"] = document.querySelector(
  "meta[name='csrf-token']"
).content;
// CSRF

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Entry />, document.getElementById("react_container"));
});
