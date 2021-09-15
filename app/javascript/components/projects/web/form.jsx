import React, { useEffect } from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Container, FormGroup, Label, Col, Button } from "reactstrap";
import { InputField, SelectField, TextareaField } from "../../helpers";
import { connect } from "react-redux";
import { getEmployees } from "components/employees/web/actions";
import { getProjects } from "./actions";
import _ from "lodash";

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

function ProjectForm(props) {
  const defaultOptions = props?.initialValues?.site_supervisors;

  useEffect(() => {
    if (props.employees.length === 0) {
      props.getEmployees();
    }
    if (props.employees.length === 0) {
      props.getProjects();
    }
  }, []);

  const { employees, projects, values } = props;

  let site_supervisors_selected = [];
  if (!_.isEmpty(values?.site_supervisors)) {
    site_supervisors_selected = _.map(
      values.site_supervisors,
      (ss) => ss.employee_id
    );
  }

  return (
    <div>
      <Container>
        <h3>Project</h3>
        <br />
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
          <Col sm={1}></Col>
          <Label for="notes" sm={1}>
            Notes
          </Label>
          <Col sm={4}>
            <Field
              component={TextareaField}
              name="notes"
              type="textarea"
              rows="4"
              label="Project Notes..."
            />
          </Col>
        </FormGroup>
        <br />
        <hr style={{ height: 5 }} />
        <br />
        <h3>Site Supervisors</h3>
        <FieldArray
          name="site_supervisors"
          component={SiteSupervisorsAttributes}
          employees={employees}
          site_supervisors_selected={site_supervisors_selected}
          defaultOptions={defaultOptions}
        />
        <br />
        <Button type="submit" color="success" onClick={props.handleSubmit}>
          Submit
        </Button>
      </Container>
    </div>
  );
}

export default connect(mapStateToProps, { getEmployees, getProjects })(
  ProjectForm
);

function SiteSupervisorsAttributes(props) {
  const { fields, employees, defaultOptions, site_supervisors_selected } =
    props;

  return (
    <div>
      {fields.map((name, index) => (
        <SiteSupervisorsFields
          key={index}
          index={index}
          fields={fields}
          name={name}
          employees={employees}
          defaultOptions={defaultOptions}
          site_supervisors_selected={site_supervisors_selected}
        />
      ))}
      <br />
      <Button type="button" onClick={() => fields.push({})}>
        Add New Site Supervisor +
      </Button>
    </div>
  );
}

function SiteSupervisorsFields(props) {
  const {
    fields,
    index,
    employees,
    defaultOptions,
    name,
    site_supervisors_selected,
  } = props;

  const thisField = fields?.value[index];

  const options = _.map(employees, (e) => {
    return { label: e.display_name, value: e.id };
  });

  let filteredOptions = _.clone(options);
  if (!_.isEmpty(site_supervisors_selected)) {
    filteredOptions = _.filter(
      options,
      (o) =>
        !site_supervisors_selected.includes(o.value) ||
        o.value == thisField.employee_id
    );
  }
  return (
    <FormGroup row key={index} className="mb-2">
      <Label for="employee_id" sm={2}>
        Employee
      </Label>
      <Col sm={3}>
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
