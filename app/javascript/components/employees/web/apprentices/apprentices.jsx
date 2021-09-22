import React from "react";
import { Field } from "react-final-form";
import { FormGroup, Col, Button } from "reactstrap";
import { SelectField } from "../../../helpers";

const required = (value) => (value ? undefined : "Required");

export default function ApprenticesAttributes(props) {
  const {
    fields,
    fields: { value },
    employees,
    apprentices_selected,
    composeValidators,
  } = props;

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
              composeValidators={composeValidators}
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
    composeValidators,
  } = props;

  const thisField = fields?.value[index];

  const options = _.map(employees, (e) => {
    return { label: e.display_name, value: e.id };
  });

  let filteredOptions = _.clone(options);

  // console.log(apprentices_selected);
  // console.log(filteredOptions);

  if (!_.isEmpty(apprentices_selected)) {
    filteredOptions = _.filter(
      options,
      (o) =>
        !apprentices_selected.includes(o.value) ||
        o.value == thisField.apprentice_id
    );
  }
  return (
    <FormGroup row key={index} className="mb-2">
      <Col sm={6}>
        <Field
          component={SelectField}
          name={`${name}.apprentice_id`}
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
