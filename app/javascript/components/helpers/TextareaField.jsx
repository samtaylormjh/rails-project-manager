import React from "react";
import { Input, FormGroup } from "reactstrap";

export default function TextareaField(props) {
  const { input, meta } = props;

  return (
    <div>
      <FormGroup>
        <Input {...input} placeholder={props.label} rows={props.rows} />
      </FormGroup>
    </div>
  );
}

TextareaField.defaultProps = {
  type: "textarea",
};
