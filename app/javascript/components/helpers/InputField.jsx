import React from "react";
import { Input, FormGroup, FormFeedback } from "reactstrap";

export default function InputField(props) {
  const { input, meta } = props;

  return (
    <div>
      <FormGroup>
        <Input
          valid={meta.modified && meta.valid}
          invalid={meta.modified && meta.invalid}
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
