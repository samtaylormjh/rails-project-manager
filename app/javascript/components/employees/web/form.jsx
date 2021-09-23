import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Container, FormGroup, Label, Col, Button, Row } from "reactstrap";
import { InputField } from "../../helpers";
import { getProjects } from "../../projects/web/actions";
import { getEmployees } from "../../employees/web/actions";
import EmergencyContactAttributes from "./form/emergency_contacts_attributes";
import ApprenticesAttributes from "./form/apprentices_attributes";
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
      (a) => a.apprentice_id
    );
  }
  const apprenticeList = _.map(employees, (e) =>
    _.map(e.apprentices_attributes, (aa) => aa.apprentice_id)
  );
  _.map(apprenticeList.flat(), (a) => apprentices_selected.push(a));
  if (!apprentices_selected.includes(values.id)) {
    apprentices_selected.push(values.id);
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
                composeValidators={composeValidators}
              />
            </Col>
          </FormGroup>
          <br />
          <hr style={{ height: 5 }} />
          <br />
          <h3>Emergency Contact</h3>
          <br />
          <FieldArray
            name="emergency_contacts_attributes"
            change={change}
            component={EmergencyContactAttributes}
            composeValidators={composeValidators}
          />
          <br />
          <Button type="submit" color="success" onClick={props.handleSubmit}>
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default connect(mapStateToProps, {
  getProjects,
  getEmployees,
})(EmployeeForm);
