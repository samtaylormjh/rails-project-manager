import React, { useEffect } from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Container, FormGroup, Label, Col, Button, Row } from "reactstrap";
import { CheckboxField, InputField } from "../../helpers";

const required = (value) => (value ? undefined : "Required");

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

export default function EmployeeForm(props) {
  const {
    form: { change },
  } = props;

  return (
    <div>
      <Container>
        <h3>Employee</h3>
        <br />
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
        <hr style={{ height: 5 }} />
        <br />
        <h3>Emergency Contact</h3>
        <FieldArray
          name="emergency_contacts"
          component={EmergencyContactAttributes}
          change={change}
        />
        <br />
        <Button type="submit" color="success" onClick={props.handleSubmit}>
          Submit
        </Button>
      </Container>
    </div>
  );
}

function EmergencyContactAttributes(props) {
  const { fields, change } = props;

  const uncheckAll = (nameNotToChange) => {
    fields.forEach((nameToChange) => {
      if (nameToChange != nameNotToChange) {
        change(`${nameToChange}.primary`, false);
      }
    });
  };

  return (
    <div>
      {fields.map((name, index) => (
        <EmergencyContactFields
          key={index}
          index={index}
          fields={fields}
          name={name}
          uncheckAll={uncheckAll}
        />
      ))}
      <br />
      <Button type="button" onClick={() => fields.push({})}>
        New Emergency Contact +
      </Button>
    </div>
  );
}

function EmergencyContactFields(props) {
  const { fields, index, name } = props;

  const thisField = fields.value[index];

  useEffect(() => {
    if (thisField.primary == true) {
      props.uncheckAll(name);
    }
  }, [thisField.primary]);

  return (
    <FormGroup row key={index} className="mb-2">
      <Col sm={3}>
        <Field
          component={InputField}
          name={`${name}.fname`}
          label="First Name"
          validate={composeValidators(required)}
        />
      </Col>
      <Col sm={3}>
        <Field
          component={InputField}
          label="Last Name"
          name={`${name}.lname`}
          validate={composeValidators(required)}
        />
      </Col>
      <Col sm={3}>
        <Field
          component={InputField}
          label="Number"
          name={`${name}.number`}
          validate={composeValidators(required)}
        />
      </Col>
      <Col>
        <Row>
          <Col>
            <Label for="primary">Primary</Label>
          </Col>
          <Col>
            <Field
              name={`${name}.primary`}
              type="checkbox"
              component={CheckboxField}
              style={{ width: "20px", height: "20px" }}
            />
          </Col>
        </Row>
      </Col>
      <Col>
        <Button
          type="button"
          color="danger"
          onClick={() => fields.remove(index)}
        >
          Remove
        </Button>
      </Col>
    </FormGroup>
  );
}
