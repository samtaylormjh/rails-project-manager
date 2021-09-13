import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { addProject } from "./actions";
import ProjectForm from "./form";

function mapStateToProps(state) {
  return { projects: state.projects };
}

function NewProject(props) {
  const handleSubmit = (values) => {
    const duplicateName = _.some(
      props.projects,
      (p) => p.name.toLowerCase() == values.name.toLowerCase()
    );

    if (duplicateName) {
      alert("Project name already exists.");
    } else {
      const req = props.addProject(values);
      req.then(() => {
        props.history.push("/?tab=2");
      });
    }
  };

  return (
    <Container>
      <br />
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={"/?tab=2"}>Projects</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active tag="span">
          New Project
        </BreadcrumbItem>
      </Breadcrumb>
      <br />
      <Form
        component={ProjectForm}
        onSubmit={handleSubmit}
        mutators={{
          ...arrayMutators,
        }}
      />
    </Container>
  );
}

export default connect(mapStateToProps, { addProject })(NewProject);
