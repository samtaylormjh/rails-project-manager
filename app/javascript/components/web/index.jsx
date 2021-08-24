import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getProjects, deleteProject } from "../projects/web/actions"
import { getEmployees, deleteEmployee } from "../employees/web/actions"
import _ from "lodash"
import classnames from "classnames"
import {
  Button,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Table,
} from "reactstrap"

function mapStateToProps(state) {
  return { projects: state.projects, employees: state.employees }
}

function Index(props) {
  useEffect(() => {
    if (props.projects.length === 0) {
      props.getProjects()
    }
  }, [])

  useEffect(() => {
    if (props.employees.length === 0) {
      props.getEmployees()
    }
  }, [])

  let initialState = "1"
  if (props.location.search === "?tab=2") {
    initialState = "2"
  }

  const [activeTab, setActiveTab] = useState(initialState)

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <Container>
      <br />
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1")
            }}
          >
            Employees
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2")
            }}
          >
            Projects
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
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
              <Table hover size="sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(props.employees, (employee) => (
                    <Employee
                      key={employee.id}
                      employee={employee}
                      deleteEmployee={props.deleteEmployee}
                    />
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="10">
              <br />
              <Link to={"/projects/new"}>
                <Button color="primary" size="sm">
                  New Project +
                </Button>
              </Link>
              <br />
              <br />
              <Table hover size="sm">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Assigned Employees</th>
                    <th>Project ID</th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(props.projects, (project) => (
                    <Project
                      key={project.id}
                      project={project}
                      employees={props.employees}
                      deleteProject={props.deleteProject}
                    />
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </Container>
  )
}

export default connect(mapStateToProps, {
  getProjects,
  deleteProject,
  getEmployees,
  deleteEmployee,
})(Index)

const Project = (props) => {
  const { project, employees } = props
  const assignedEmployees = employees.map((e) => {
    const id = _.filter(e.project, (id) => console.log(id))
  })

  return (
    <tr>
      <td>{project.name}</td>
      <td>*project managers*</td>
      <td>{project.id}</td>
      <td>
        <Link to={`projects/${project.id}/edit`}>
          <Button size="sm">Edit</Button>
        </Link>{" "}
        <Button
          color="danger"
          size="sm"
          onClick={() => {
            props.deleteProject(project.id)
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  )
}

const Employee = (props) => {
  const { employee } = props

  return (
    <tr>
      <td>{employee.id}</td>
      <td>{employee.fname}</td>
      <td>{employee.lname}</td>
      <td>
        <Link to={`employees/${employee.id}/edit`}>
          <Button size="sm">Edit</Button>
        </Link>{" "}
        <Button
          color="danger"
          size="sm"
          onClick={() => {
            props.deleteEmployee(employee.id)
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  )
}
