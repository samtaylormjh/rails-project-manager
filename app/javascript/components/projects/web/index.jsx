import React from "react";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import {
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import { TextareaField } from "../../helpers";
import arrayToSentence from "array-to-sentence";

export default function Project(props) {
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
          <NoteEditor notes={project} updateProject={props.updateProject} />
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

const NoteEditor = (props) => {
  const handleSubmit = (values) => {
    const req = props.updateProject(values);
    req.then(() => {
      //close popover? or recall the list of notes to show the added one
    });
  };

  const { notes } = props;

  return (
    <Form component={NoteForm} onSubmit={handleSubmit} initialValues={notes} />
  );
};

const NoteForm = (props) => {
  return (
    <>
      <Field
        component={TextareaField}
        name="notes"
        type="textarea"
        rows="4"
        label="Project Notes..."
      />
      <br />
      <Button
        color="success"
        size="sm"
        type="submit"
        onClick={props.handleSubmit}
      >
        Add Note +
      </Button>
    </>
  );
};
