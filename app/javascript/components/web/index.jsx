import React, { useState } from "react";
import ProjectIndex from "../projects/web/";
import EmployeeIndex from "../employees/web/";
import ApprenticeIndex from "../apprentices/web";
import _ from "lodash";
import classnames from "classnames";
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

export default function Index(props) {
  let initialState = "1";
  if (props.location.search === "?tab=2") {
    initialState = "2";
  } else if (props.location.search === "?tab=1") {
    initialState = "1";
  } else if (props.location.search === "?tab=3") {
    initialState = "3";
  }

  const [activeTab, setActiveTab] = useState(initialState);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container>
      <br />
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
              props.history.push("/?tab=1");
            }}
          >
            Employees
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
              props.history.push("/?tab=2");
            }}
          >
            Projects
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
              props.history.push("/?tab=3");
            }}
          >
            Apprentices
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <EmployeeIndex />
        </TabPane>
        <TabPane tabId="2">
          <ProjectIndex />
        </TabPane>
        <TabPane tabId="3">
          <ApprenticeIndex />
        </TabPane>
      </TabContent>
    </Container>
  );
}
