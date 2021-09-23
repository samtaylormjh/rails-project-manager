import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import arrayToSentence from "array-to-sentence";
import Notes from "./notes";

export default function ProjectAttributes(props) {
  const { project, employees } = props;

  const assignedEmployees = _.map(project.site_supervisors_attributes, (ss) => {
    const findSupervisors = _.find(employees, (e) => e.id == ss.employee_id);
    if (findSupervisors) {
      return `${findSupervisors.fname} ${findSupervisors.lname}`;
    }
  });

  return (
    <tr>
      <td>{project.name}</td>
      <td>{arrayToSentence(assignedEmployees)}</td>
      <td>{project.id}</td>
      <td
        style={{ color: "grey", cursor: "pointer" }}
        id={`popover${project.id}`}
      >
        Click to view...
      </td>
      <UncontrolledPopover
        trigger="legacy"
        placement="right"
        target={`popover${project.id}`}
      >
        <PopoverHeader>{project.name} Notes</PopoverHeader>
        <PopoverBody>
          {/* <li>Cool list of notes</li>
          <br /> */}
          <Notes notes={project} updateProject={props.updateProject} />
        </PopoverBody>
      </UncontrolledPopover>
      <td>
        <Link to={`projects/${project.id}/edit`}>
          <Button size="sm">Edit</Button>
        </Link>{" "}
        <Button
          color="danger"
          size="sm"
          onClick={() => {
            props.deleteProject(project.id);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
