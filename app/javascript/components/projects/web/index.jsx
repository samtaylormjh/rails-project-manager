import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProjects, deleteProject, updateProject } from "./actions";
import { getEmployees } from "../../employees/web/actions";
import ProjectRow from "./index/project_row";
import _ from "lodash";
import { Button, Row, Col, Table } from "reactstrap";

function mapStateToProps(state) {
  return { projects: state.projects, employees: state.employees };
}

function ProjectIndex(props) {
  useEffect(() => {
    if (props.projects.length === 0) {
      props.getProjects();
    }
  }, []);

  return (
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
        <Table hover size="sm" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th>Project</th>
              <th>Site Supervisors</th>
              <th>Project ID</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {_.map(props.projects, (project) => (
              <ProjectRow
                key={project.id}
                project={project}
                employees={props.employees}
                deleteProject={props.deleteProject}
                updateProject={props.updateProject}
              />
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default connect(mapStateToProps, {
  getProjects,
  getEmployees,
  deleteProject,
  updateProject,
})(ProjectIndex);
