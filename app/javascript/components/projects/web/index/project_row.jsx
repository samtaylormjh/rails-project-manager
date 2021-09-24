import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import arrayToSentence from "array-to-sentence";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { TextareaField } from "components/helpers";

function ProjectRow(props) {
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
      <Notes
        notes={project}
        updateProject={props.updateProject}
        project={props.project}
      />
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

export default ProjectRow;

function Notes(props) {
  const { notes, project } = props;

  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  const handleSubmit = (values) => {
    const req = props.updateProject(values);
    req.then(() => {
      toggle();
      toastr.success("Saved notes");
    });
  };

  return (
    <Popover
      placement="right"
      target={`popover${project.id}`}
      trigger="legacy"
      isOpen={popoverOpen}
      toggle={toggle}
    >
      <PopoverHeader>{project.name} Notes</PopoverHeader>
      <PopoverBody>
        {/* <li>Cool list of notes</li>
          <br /> */}
        <Form
          component={NoteForm}
          onSubmit={handleSubmit}
          initialValues={notes}
        />
      </PopoverBody>
    </Popover>
  );
}

function NoteForm(props) {
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
}
