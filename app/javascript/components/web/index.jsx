import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProjects,
  deleteProject,
  updateProject,
} from "../projects/web/actions";
import { getEmployees, deleteEmployee } from "../employees/web/actions";
import Project from "../projects/web/index";
import EmployeeAttributes from "../employees/web/form/employee_attributes";
import EmployeeIndex from "../employees/web/index";
import _ from "lodash";
import classnames from "classnames";
import {
  Button,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Table,
} from "reactstrap";

function mapStateToProps(state) {
  return { projects: state.projects, employees: state.employees };
}

function Index(props) {
  useEffect(() => {
    if (props.projects.length === 0) {
      props.getProjects();
    }
  }, []);

  useEffect(() => {
    if (props.employees.length === 0) {
      props.getEmployees();
    }
  }, []);

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
              props.getEmployees();
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
              props.getProjects();
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
              props.getProjects();
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
          <Row>
            <Col sm="10">
              <br />
              <Link to={"/projects/new"}>
                <Button color="primary" size="sm">
                  New Project +
                </Button>
              </Link>
              <br />
              <br />
              <Table hover size="sm" style={{ tableLayout: "fixed" }}>
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Site Supervisors</th>
                    <th>Project ID</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(props.projects, (project) => (
                    <Project
                      key={project.id}
                      project={project}
                      employees={props.employees}
                      deleteProject={props.deleteProject}
                      updateProject={props.updateProject}
                    />
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="10">
              <br />
              <Table hover size="sm" style={{ tableLayout: "fixed" }}>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Apprentices</th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(props.employees, (employee) => (
                    <tr>
                      <td>{employee.display_name}</td>
                      <td>{employee.list_of_apprentices}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </Container>
  );
}

export default connect(mapStateToProps, {
  getProjects,
  deleteProject,
  getEmployees,
  deleteEmployee,
  updateProject,
})(Index);
