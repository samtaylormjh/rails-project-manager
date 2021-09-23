import React from "react";
import { Field, Form } from "react-final-form";
import { Button } from "reactstrap";
import { TextareaField } from "../../../helpers";

export default function Notes(props) {
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
