import React from "react";
import { Input, FormGroup, FormFeedback } from "reactstrap";

export default function InputField(props) {
  const { input, meta } = props;
  // console.log(meta);

  return (
    <div>
      <FormGroup>
        <Input
          valid={meta.touched && meta.valid}
          invalid={meta.touched && meta.invalid}
          {...input}
          placeholder={props.label}
        />
        <FormFeedback valid>Valid</FormFeedback>
        <FormFeedback invalid="true">{meta.error}</FormFeedback>
      </FormGroup>
    </div>
  );
}

InputField.defaultProps = {
  type: "text",
};
