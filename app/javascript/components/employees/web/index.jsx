import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEmployees, deleteEmployee } from "./actions";
import _ from "lodash";
import { Button, Row, Col, Table, Tooltip } from "reactstrap";

function mapStateToProps(state) {
  return { employees: state.employees };
}

function EmployeeIndex(props) {
  useEffect(() => {
    if (props.employees.length === 0) {
      props.getEmployees();
    }
  }, []);

  return (
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
              <EmployeeRow
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
  );
}

function EmployeeRow(props) {
  const { employee, projects } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const disableDelete = !_.isEmpty(employee.projects);

  return (
    <>
      <tr>
        <td
          onClick={toggle}
          style={{ cursor: "pointer" }}
          name={`${employee.id}_projects`}
        >
          {isOpen ? "-" : "+"}
        </td>
        <td>{employee.id}</td>
        <td>{employee.fname}</td>
        <td>{employee.lname}</td>
        <td>
          <Link to={`employees/${employee.id}/edit`}>
            <Button size="sm">Edit</Button>
          </Link>{" "}
          <DeleteButton
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
}

const DeleteButton = (props) => {
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
        id={`${employee.id}.delete`}
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

export default connect(mapStateToProps, {
  getEmployees,
  deleteEmployee,
})(EmployeeIndex);
