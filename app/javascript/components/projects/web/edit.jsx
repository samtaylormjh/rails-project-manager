import React, { useEffect } from "react";
import { getProjects, updateProject } from "./actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { Form } from "react-final-form";
import ProjectForm from "./form";
import arrayMutators from "final-form-arrays";

function mapStateToProps(state, ownProps) {
  const { projects } = state;
  const selectedProject = projects.find(
    (e) => e.id == ownProps.match.params.id
  );
  return { selectedProject, employees: state.employees };
}

function EditProject(props) {
  useEffect(() => {
    props.getProjects();
  }, []);

  const selectedProject = props.selectedProject;
  const handleSubmit = (values) => {
    props.updateProject(values);
    props.history.push("/");
  };

  return (
    <Container>
      <br />
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={"/?tab=2"}>Projects</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active tag="span">
          Edit Project
        </BreadcrumbItem>
      </Breadcrumb>
      <br />
      <Form
        component={ProjectForm}
        onSubmit={handleSubmit}
        initialValues={selectedProject}
        mutators={{
          ...arrayMutators,
        }}
      />
    </Container>
  );
}

export default connect(mapStateToProps, { getProjects, updateProject })(
  EditProject
);
