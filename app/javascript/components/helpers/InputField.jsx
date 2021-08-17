import React from "react";
import { Input, FormGroup, FormFeedback } from "reactstrap";

export default function InputField(props) {
  const { input, meta } = props;
  const userInput = {
    checked: input.checked,
    name: input.name,
    onBlur: input.onBlur,
    onChange: input.onChange,
    onFocus: input.onFocus,
    value: input.value.toUpperCase(),
  };

  return (
    <div>
      <FormGroup>
        <Input
          valid={meta.touched && meta.valid}
          invalid={meta.touched && meta.invalid}
          type="text"
          onChange={(e) => {
            input.onChange(e.target.value);
          }}
          value={input.value}
          placeholder={props.label}
        />
        <FormFeedback valid>Valid</FormFeedback>
        <FormFeedback invalid="true">{meta.error}</FormFeedback>
      </FormGroup>
    </div>
  );
}
