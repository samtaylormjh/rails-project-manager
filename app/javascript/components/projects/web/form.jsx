import React from "react";
import { Field } from "react-final-form";
import { Container, FormGroup, Label, Col, Button } from "reactstrap";
import { InputField } from "../../helpers";

const required = (value) => (value ? undefined : "Required");

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

export default function ProjectForm(props) {
  return (
    <div>
      <Container>
        <FormGroup row>
          <Label for="name" sm={2}>
            Name
          </Label>
          <Col sm={3}>
            <Field
              component={InputField}
              name="name"
              label="Project Name"
              validate={composeValidators(required)}
            />
          </Col>
        </FormGroup>
        <br />
        <Button type="submit" onClick={props.handleSubmit}>
          Submit
        </Button>
      </Container>
    </div>
  );
}
