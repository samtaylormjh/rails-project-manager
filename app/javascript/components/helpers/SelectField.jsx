import React from "react"
import Select from "react-select"
import { FormGroup } from "reactstrap"
import _ from "lodash"

export default function SelectField(props) {
  const { input, meta, projects } = props

  const userInput = {
    checked: input.checked,
    name: input.name,
    onBlur: input.onBlur,
    onChange: input.onChange,
    onFocus: input.onFocus,
    value: input.value,
  }

  return (
    <div>
      <FormGroup>
        <Select
          isMulti
          valid={meta.touched && meta.valid}
          invalid={meta.touched && meta.invalid}
          {...userInput}
          options={_.map(projects, (p) => {
            return {
              value: p.id,
              label: p.name,
            }
          })}
        />
      </FormGroup>
    </div>
  )
}
