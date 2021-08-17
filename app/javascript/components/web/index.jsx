import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProjects } from "../projects/web/actions";
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
  return { projects: state.projects };
}

function Index(props) {
  useEffect(() => {
    if (props.projects.length === 0) {
      props.getProjects();
    }
  }, []);

  let initialState = "1";
  if (props.location.search === "?tab=2") {
    initialState = "2";
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
            }}
          >
            Projects
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <br />
              <Link to="/employees/new">
                <Button color="primary" size="sm">
                  New Employee +
                </Button>
              </Link>
              <br />
              <br />
              <Table hover size="sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {_.map(props.employees, (employee) => (
                    <Employee key={employee.id} employee={employee} />
                  ))} */}
                </tbody>
              </Table>
            </Col>
          </Row>
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
              <Table hover size="sm">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Project Manager</th>
                    <th>Project ID</th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(props.projects, (project) => (
                    <Project key={project.id} project={project} />
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

export default connect(mapStateToProps, { getProjects })(Index);

const Project = (props) => {
  const { project } = props;

  return (
    <tr>
      <td>{project.name}</td>
      <td>*project managers*</td>
      <td>{project.id}</td>
      <td>
        <Link to={`projects/${project.id}/edit`}>
          <Button size="sm">Edit</Button>
        </Link>{" "}
        <Button color="danger" size="sm">
          Delete
        </Button>
      </td>
    </tr>
  );
};
