import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEmployees, deleteEmployee } from "./actions";
import EmployeeAttributes from "./form/employee_attributes";
import _ from "lodash";
import { Button, Row, Col, Table } from "reactstrap";

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
              <EmployeeAttributes
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

export default connect(mapStateToProps, {
  getEmployees,
  deleteEmployee,
})(EmployeeIndex);
