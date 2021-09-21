import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Container, FormGroup, Label, Col, Button, Row } from "reactstrap";
import { CheckboxField, InputField, SelectField } from "../../helpers";
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

  const { employees, values } = props;

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

  let apprentices_selected = [];
  if (!_.isEmpty(values?.apprentices_attributes)) {
    apprentices_selected = _.map(
      values.apprentices_attributes,
      (a) => a.employee_id
    );
  }

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
          <br />
          <FormGroup row>
            <Label for="apprentice" sm={2}>
              Apprentices
            </Label>
            <Col sm={3}>
              <FieldArray
                name="apprentices_attributes"
                component={ApprenticesAttributes}
                employees={employees}
                apprentices_selected={apprentices_selected}
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

function ApprenticesAttributes(props) {
  const { fields, employees, defaultOptions, apprentices_selected } = props;
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
            <ApprenticeFields
              key={index}
              index={index}
              fields={fields}
              name={name}
              employees={employees}
              removeField={removeField}
              apprentices_selected={apprentices_selected}
            />
          );
        }
      })}
      <br />
      <Button type="button" onClick={() => fields.push({})}>
        Assign Apprentice +
      </Button>
    </div>
  );
}

function ApprenticeFields(props) {
  const {
    fields,
    index,
    employees,
    defaultOptions,
    name,
    apprentices_selected,
    removeField,
  } = props;

  const thisField = fields?.value[index];

  const options = _.map(employees, (e) => {
    return { label: e.display_name, value: e.id };
  });

  let filteredOptions = _.clone(options);
  if (!_.isEmpty(apprentices_selected)) {
    filteredOptions = _.filter(
      options,
      (o) =>
        !apprentices_selected.includes(o.value) ||
        o.value == thisField.employee_id
    );
  }
  return (
    <FormGroup row key={index} className="mb-2">
      <Col sm={6}>
        <Field
          component={SelectField}
          name={`${name}.employee_id`}
          label="Employees"
          options={filteredOptions}
          defaultOptions={defaultOptions}
          validate={composeValidators(required)}
        />
      </Col>
      <Col>
        <Button type="button" color="danger" onClick={() => removeField(index)}>
          Remove
        </Button>
      </Col>
    </FormGroup>
  );
}
