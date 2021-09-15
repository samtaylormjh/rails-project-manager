import React from "react";
import { Input, FormGroup } from "reactstrap";

export default function CheckboxField(props) {
  const { input } = props;

  return (
    <div>
      <FormGroup>
        <Input {...input} placeholder={props.label} />
      </FormGroup>
    </div>
  );
}

CheckboxField.defaultProps = {
  type: "checkbox",
};
