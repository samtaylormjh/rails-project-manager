import React from "react";
import Select from "react-select";
import { FormGroup } from "reactstrap";
import _ from "lodash";

export default function SelectField(props) {
  const { input, meta, employees } = props;

  const userInput = {
    checked: input.checked,
    name: input.name,
    onBlur: input.onBlur,
    onChange: input.onChange,
    onFocus: input.onFocus,
    value: input.value,
  };

  return (
    <div>
      <FormGroup>
        <Select
          isMulti
          valid={meta.touched && meta.valid}
          invalid={meta.touched && meta.invalid}
          {...userInput}
          options={_.map(employees, (e) => {
            return {
              value: e.id,
              label: e.fname + " " + e.lname,
            };
          })}
        />
      </FormGroup>
    </div>
  );
}
