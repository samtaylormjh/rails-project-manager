import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Index from "./index"
import NewProject from "../projects/web/new"
import EditProject from "../projects/web/edit"
import NewEmployee from "../employees/web/new"

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/employees/new" component={NewEmployee} />
        <Route exact path="/projects/new" component={NewProject} />
        <Route exact path="/projects/:id/edit" component={EditProject} />
      </Switch>
    </Router>
  )
}
