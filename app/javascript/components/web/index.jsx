import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProjects,
  deleteProject,
  updateProject,
} from "../projects/web/actions";
import { getEmployees, deleteEmployee } from "../employees/web/actions";
import { Form, Field } from "react-final-form";
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
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import { TextareaField } from "../helpers";

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
              <Table hover size="sm" style={{ tableLayout: "fixed" }}>
                <thead>
                  <tr>
                    <th></th>
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

const Project = (props) => {
  const { project, employees } = props;

  const assignedEmployees = _.map(project.site_supervisors, (ss, i) => {
    const findSupervisors = _.find(employees, (e) => e.id == ss.employee_id);
    if (findSupervisors) {
      return `${findSupervisors.fname} ${findSupervisors.lname}`;
    }
  });

  // if (project.notes == "") {
  //   project.notes = "No notes for project.";
  // }

  // if theres only 1 employee returns "and 'employee'"
  // const last = assignedEmployees.pop();
  // const employeeList = assignedEmployees.join(", ") + " and " + last;

  return (
    <tr>
      <td>{project.name}</td>
      <td>{assignedEmployees.join(" ")}</td>
      <td>{project.id}</td>
      <td
        style={{ color: "grey", cursor: "pointer" }}
        id={`popover${project.id}`}
      >
        Click to view...
      </td>
      <UncontrolledPopover
        trigger="legacy"
        placement="right"
        target={`popover${project.id}`}
      >
        <PopoverHeader>{project.name} Notes</PopoverHeader>
        <PopoverBody>
          {/* <li>Cool list of notes</li>
          <br /> */}
          <NoteEditor notes={project} updateProject={props.updateProject} />
        </PopoverBody>
      </UncontrolledPopover>
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

const NoteEditor = (props) => {
  const handleSubmit = (values) => {
    const req = props.updateProject(values);
    req.then(() => {
      //close popover? or recall the list of notes to show the added one
    });
  };

  const { notes } = props;

  return (
    <Form component={NoteForm} onSubmit={handleSubmit} initialValues={notes} />
  );
};

const NoteForm = (props) => {
  return (
    <>
      <Field
        component={TextareaField}
        name="notes"
        type="textarea"
        rows="4"
        label="Project Notes..."
      />
      <br />
      <Button
        color="success"
        size="sm"
        type="submit"
        onClick={props.handleSubmit}
      >
        Add Note +
      </Button>
    </>
  );
};

const Employee = (props) => {
  const { employee, projects } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const disableDelete = !_.isEmpty(employee.projects);

  return (
    <>
      <tr>
        <td onClick={toggle} style={{ cursor: "pointer" }}>
          {isOpen ? "-" : "+"}
        </td>
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
      {isOpen && (
        <>
          <tr>
            <th></th>
            <th>Project ID</th>
            <th>Project Name</th>
          </tr>
          {_.map(employee.projects, (emp) => {
            const assignedProject = _.find(
              projects,
              (p) => p.id == emp?.project_id
            );
            return (
              <tr key={emp?.project_id}>
                <td></td>
                <td>{emp?.project_id}</td>
                <td>{assignedProject?.name}</td>
              </tr>
            );
          })}
        </>
      )}
    </>
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
