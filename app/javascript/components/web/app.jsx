import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./index";
import NewProject from "../projects/web/new";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/projects/new" component={NewProject} />
      </Switch>
    </Router>
  );
}
