import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Container, FormGroup, Label, Col, Button, Row } from "reactstrap";
import { CheckboxField, InputField } from "../../helpers";
import { getProjects } from "../../projects/web/actions";
import { getEmployees } from "../../employees/web/actions";

const required = (value) => (value ? undefined : "Required");

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

function mapStateToProps(state) {
  return { projects: state.projects, employees: state.employees };
}

function EmployeeForm(props) {
  const {
    form: { change },
  } = props;

  useEffect(() => {
    if (props.projects.length === 0) {
      props.getProjects();
    }
  }, []);

  useEffect(() => {
    if (props.employees.length === 0) {
      props.getEmployees();
    }
  }, []);

  return (
    <div>
      <Container>
        <h3>Employee</h3>
        <br />
        <form>
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
        </form>
        <br />
        <hr style={{ height: 5 }} />
        <br />
        <h3>Emergency Contact</h3>
        <br />
        <FieldArray
          name="emergency_contacts_attributes"
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

export default connect(mapStateToProps, {
  getProjects,
  getEmployees,
})(EmployeeForm);

function EmergencyContactAttributes(props) {
  const { fields, change } = props;

  const uncheckAll = (nameNotToChange) => {
    fields.forEach((nameToChange) => {
      if (nameToChange != nameNotToChange) {
        change(`${nameToChange}.primary`, false);
      }
    });
  };

  const removeField = (index) => {
    const thisField = fields?.value[index];

    if (thisField.id) {
      fields.push({ id: thisField.id, _destroy: "1" });
      fields.remove(index);
    } else {
      fields.remove(index);
    }
  };

  return (
    <div>
      {fields.map((name, index) => {
        const thisField = fields?.value[index];
        if (!thisField._destroy) {
          return (
            <EmergencyContactFields
              key={index}
              index={index}
              fields={fields}
              name={name}
              uncheckAll={uncheckAll}
              removeField={removeField}
            />
          );
        }
      })}
      <Button type="button" onClick={() => fields.push({})}>
        New Emergency Contact +
      </Button>
    </div>
  );
}

function EmergencyContactFields(props) {
  const { fields, index, name, removeField } = props;

  const thisField = fields.value[index];

  useEffect(() => {
    if (thisField.primary == true) {
      props.uncheckAll(name);
    }
  }, [thisField.primary]);

  console.log(fields);

  // useEffect(() => {
  //   if (fields.value[0] == {}) {
  //     fields.value[0] = {
  //       primary: true,
  //     };
  //   }
  // }, []);

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
        <Button type="button" color="danger" onClick={() => removeField(index)}>
          Remove
        </Button>
      </Col>
    </FormGroup>
  );
}
