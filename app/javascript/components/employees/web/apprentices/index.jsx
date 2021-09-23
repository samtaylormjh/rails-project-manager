import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getEmployees } from "../actions";
import _ from "lodash";
import { Row, Col, Table } from "reactstrap";

function mapStateToProps(state) {
  return { projects: state.projects, employees: state.employees };
}

function ApprenticeIndex(props) {
  useEffect(() => {
    if (props.employees.length === 0) {
      props.getEmployees();
    }
  }, []);

  return (
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
  );
}

export default connect(mapStateToProps, {
  getEmployees,
})(ApprenticeIndex);
