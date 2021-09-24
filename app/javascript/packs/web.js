import React from "react";
import ReactDOM from "react-dom";

import Entry from "components/web/1_entry";
import axios from "axios";

// CSRF
// axios.defaults.headers.common["X-CSRF-Token"] = document.querySelector(
//   "meta[name='csrf-token']"
// ).content;
// CSRF

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Entry />, document.getElementById("react_container"));
});

// Toastr Settings
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-bottom-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "2000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};
