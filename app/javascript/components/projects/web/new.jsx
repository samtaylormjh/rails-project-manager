import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { Form } from "react-final-form";
import { addProject } from "./actions";
import ProjectForm from "./form";

function mapStateToProps(state) {
  return { projects: state.projects };
}

function NewProject(props) {
  const handleSubmit = (values) => {
    props.addProject(values);
    // props.history.push("/?tab=2");
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
      <Form component={ProjectForm} onSubmit={handleSubmit} />
    </Container>
  );
}

export default connect(mapStateToProps, { addProject })(NewProject);
