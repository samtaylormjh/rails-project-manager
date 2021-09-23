import React, { useEffect } from "react";
import { Field } from "react-final-form";
import { FormGroup, Label, Col, Button, Row } from "reactstrap";
import { CheckboxField, InputField } from "../../../helpers";

const required = (value) => (value ? undefined : "Required");

export default function EmergencyContactAttributes(props) {
  const { fields, change, composeValidators } = props;

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
              composeValidators={composeValidators}
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
  const { fields, index, name, removeField, composeValidators } = props;

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
