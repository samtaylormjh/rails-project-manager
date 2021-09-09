import React from "react";
import Select from "react-select";
import { FormGroup } from "reactstrap";
import _ from "lodash";

export default function SelectField(props) {
  const { input, meta, options } = props;

  const defaultValue = options.find((o) => o.value == input.value);

  // const userInput = {
  //   checked: input.checked,
  //   name: input.name,
  //   onBlur: input.onBlur,
  //   onChange: input.onChange,
  //   onFocus: input.onFocus,
  //   value: input.value,
  // }
  const customOnChange = (objectFromReactSelect) => {
    const newValue = objectFromReactSelect.value;
    // call the onChange in the final-form field
    input.onChange(newValue);
  };

  return (
    <div>
      <FormGroup>
        <Select
          valid={meta.touched && meta.valid}
          invalid={meta.touched && meta.invalid}
          onChange={customOnChange}
          options={options}
          defaultValue={defaultValue}
        />
      </FormGroup>
    </div>
  );
}
