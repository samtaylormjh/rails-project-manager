import React from "react"
import { Field } from "react-final-form"
import { Container, FormGroup, Label, Col, Button } from "reactstrap"
import { InputField } from "../../helpers"

const required = (value) => (value ? undefined : "Required")

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    )

export default function EmployeeForm(props) {
  return (
    <div>
      <Container>
        <FormGroup row>
          <Label for="fname" sm={2}>
            First Name
          </Label>
          <Col sm={3}>
            <Field
              component={InputField}
              name="fname"
              label="First Name"
              validate={composeValidators(required)}
            />
          </Col>
        </FormGroup>
        <br />
        <FormGroup row>
          <Label for="lname" sm={2}>
            Last Name
          </Label>
          <Col sm={3}>
            <Field
              component={InputField}
              name="lname"
              label="Last Name"
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
  )
}
