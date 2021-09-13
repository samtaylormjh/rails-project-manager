import React from "react";
import { updateEmployee } from "./actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { Form } from "react-final-form";
import EmployeeForm from "./form";
import _ from "lodash";

function mapStateToProps(state, ownProps) {
  const { employees } = state;
  const selectedEmployee = employees.find(
    (e) => e.id == ownProps.match.params.id
  );
  return { selectedEmployee, projects: state.projects };
}

function EditProject(props) {
  const selectedEmployee = props.selectedEmployee;

  const handleSubmit = (values) => {
    const req = props.updateEmployee(values);
    req.then(() => {
      props.history.push("/?tab=1");
    });
  };

  return (
    <Container>
      <br />
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={"/"}>Employees</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active tag="span">
          Edit Employee
        </BreadcrumbItem>
      </Breadcrumb>
      <br />
      <Form
        component={EmployeeForm}
        onSubmit={handleSubmit}
        initialValues={selectedEmployee}
        projects={props.projects}
      />
    </Container>
  );
}

export default connect(mapStateToProps, { updateEmployee })(EditProject);
