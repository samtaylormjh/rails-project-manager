import React, { useEffect } from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Container, FormGroup, Label, Col, Button } from "reactstrap";
import { InputField, NumberField, SelectField } from "../../helpers";
import { connect } from "react-redux";
import { getEmployees } from "components/employees/web/actions";
import { getProjects } from "./actions";

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

  const { employees, projects } = props;

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
        </FormGroup>
        <br />
        <hr style={{ height: 5 }} />
        <br />
        <h3>Site Supervisors</h3>
        <FieldArray name="site_supervisors">
          {({ fields }) => (
            <div>
              {fields.map((name, index) => {
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
                        options={_.map(employees, (e) => {
                          return { label: e.display_name, value: e.id };
                        })}
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
              })}
              <br />
              <Button type="button" onClick={() => fields.push()}>
                Add New Site Supervisor +
              </Button>
            </div>
          )}
        </FieldArray>
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
