import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap"
import { Form } from "react-final-form"
import EmployeeForm from "./form"
import { addEmployee } from "./actions"

function mapStateToProps(state) {
  return { employees: state.Employees }
}

function NewProject(props) {
  const handleSubmit = (values) => {
    props.addEmployee(values)
    props.history.push("/")
  }

  return (
    <Container>
      <br />
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={"/"}>Employees</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active tag="span">
          New Employee
        </BreadcrumbItem>
      </Breadcrumb>
      <br />
      <Form component={EmployeeForm} onSubmit={handleSubmit} />
    </Container>
  )
}

export default connect(mapStateToProps, { addEmployee })(NewProject)
