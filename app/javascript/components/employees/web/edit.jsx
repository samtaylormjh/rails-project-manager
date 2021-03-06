import React, { useEffect } from "react";
import { getEmployees, updateEmployee } from "./actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
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
  useEffect(() => {
    props.getEmployees();
  }, []);

  const selectedEmployee = props.selectedEmployee;

  const handleSubmit = (values) => {
    const req = props.updateEmployee(values);
    req.then(() => {
      props.history.push("/?tab=1");
      toastr.success("Updated Employee");
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
        mutators={{
          ...arrayMutators,
        }}
      />
    </Container>
  );
}

export default connect(mapStateToProps, { getEmployees, updateEmployee })(
  EditProject
);
