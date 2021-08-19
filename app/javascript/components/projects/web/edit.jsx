import React from "react"
import { updateProject } from "./actions"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap"
import { Form } from "react-final-form"
import ProjectForm from "./form"

function mapStateToProps(state, ownProps) {
  const { projects } = state
  const selectedProject = projects.find((e) => e.id == ownProps.match.params.id)
  return { selectedProject }
}

function EditProject(props) {
  const selectedProject = props.selectedProject

  const handleSubmit = (values) => {
    props.updateProject(values)
    props.history.push("/")
  }

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
      />
    </Container>
  )
}

export default connect(mapStateToProps, { updateProject })(EditProject)
