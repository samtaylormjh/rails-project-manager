import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProjects, deleteProject } from "../projects/web/actions";
import { getEmployees, deleteEmployee } from "../employees/web/actions";
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
  Tooltip,
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
                  {_.map(props.employees, (employee) => (
                    <Employee
                      key={employee.id}
                      employee={employee}
                      deleteEmployee={props.deleteEmployee}
                      projects={props.projects}
                    />
                  ))}
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
                    <th>Assigned Employees</th>
                    <th>Project ID</th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(props.projects, (project) => (
                    <Project
                      key={project.id}
                      project={project}
                      employees={props.employees}
                      deleteProject={props.deleteProject}
                    />
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
})(Index);

const Project = (props) => {
  const { project, employees } = props;

  const assignedEmployees = _.map(project.site_supervisors, (ss) => {
    const findSupervisors = _.find(employees, (e) => e.id == ss.employee_id);
    if (findSupervisors) {
      return `${findSupervisors.fname} ${findSupervisors.lname}`;
    }
  });

  return (
    <tr>
      <td>{project.name}</td>
      <td>{assignedEmployees.join(" ")}</td>
      <td>{project.id}</td>
      <td>
        <Link to={`projects/${project.id}/edit`}>
          <Button size="sm">Edit</Button>
        </Link>{" "}
        <Button
          color="danger"
          size="sm"
          onClick={() => {
            props.deleteProject(project.id);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

const Employee = (props) => {
  const { employee, projects } = props;

  let all_projects_ss = _.map(projects, (p) => p.site_supervisors);
  all_projects_ss = _.flatten(all_projects_ss);
  all_projects_ss = _.map(all_projects_ss, (p) => p.employee_id);

  const disableDelete = _.includes(all_projects_ss, employee.id);

  // const disableDelete = !_.isEmpty(employee.projects);

  return (
    <tr>
      <td>{employee.id}</td>
      <td>{employee.fname}</td>
      <td>{employee.lname}</td>
      <td>
        <Link to={`employees/${employee.id}/edit`}>
          <Button size="sm">Edit</Button>
        </Link>{" "}
        <ButtonTooltip
          disableDelete={disableDelete}
          employee={employee}
          deleteEmployee={props.deleteEmployee}
        />
      </td>
    </tr>
  );
};

const ButtonTooltip = (props) => {
  const { disableDelete, employee, deleteEmployee } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  if (disableDelete) {
    return (
      <>
        <Button
          color="danger"
          size="sm"
          id={"DisabledButton-" + employee.id}
          onClick={() => {
            deleteEmployee(employee.id);
          }}
          disabled
        >
          Delete
        </Button>
        <Tooltip
          placement="right"
          isOpen={tooltipOpen}
          target={"DisabledButton-" + employee.id}
          toggle={toggle}
        >
          Employee is a site supervisor
        </Tooltip>
      </>
    );
  } else {
    return (
      <Button
        color="danger"
        size="sm"
        onClick={() => {
          deleteEmployee(employee.id);
        }}
      >
        Delete
      </Button>
    );
  }
};
