import React from "react";
import Select from "react-select";
import { FormGroup } from "reactstrap";
import _ from "lodash";

export default function SelectField(props) {
  const { input, meta, options } = props;

  // let filteredOptions = options.filter(
  //   (o) => o.value !== props?.formValues?.employee_id
  // );

  const defaultValue = options.find((o) => o.value == input.value);

  const customOnChange = (objectFromReactSelect) => {
    const newValue = objectFromReactSelect.value;
    if (newValue) {
      input.onChange(newValue);
    }
    // call the onChange in the final-form field
  };

  return (
    <div>
      <FormGroup>
        <Select
          valid={meta.touched && meta.valid}
          invalid={meta.touched && meta.invalid}
          onChange={customOnChange}
          options={options}
          value={defaultValue}
        />
      </FormGroup>
    </div>
  );
}
