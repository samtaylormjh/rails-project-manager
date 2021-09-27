import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { Form } from "react-final-form";
import EmployeeForm from "./form";
import { addEmployee } from "./actions";
import arrayMutators from "final-form-arrays";

function mapStateToProps(state) {
  return { employees: state.employees, projects: state.projects };
}

function NewProject(props) {
  const handleSubmit = (values) => {
    const req = props.addEmployee(values);
    req.then(() => {
      props.history.push("/?tab=1");
      toastr.success("Created Employee");
    });
  };

  return (
    <Container>
      <br />
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={"/?tab=1"}>Employees</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active tag="span">
          New Employee
        </BreadcrumbItem>
      </Breadcrumb>
      <br />
      <Form
        component={EmployeeForm}
        onSubmit={handleSubmit}
        projects={props.projects}
        mutators={{
          ...arrayMutators,
        }}
      />
    </Container>
  );
}

export default connect(mapStateToProps, { addEmployee })(NewProject);
