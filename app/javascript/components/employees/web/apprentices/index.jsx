import React from "react";
import arrayToSentence from "array-to-sentence";

export default function Apprentices(props) {
  const { employee, employees } = props;

  const assignedApprentices = _.map(employee.apprentices_attributes, (aa) => {
    const findApprentice = _.find(employees, (e) => e.id == aa.apprentice_id);
    if (findApprentice) {
      return `${findApprentice.fname} ${findApprentice.lname}`;
    }
  });

  return (
    <>
      <tr>
        <td>
          {employee.fname} {employee.lname}
        </td>
        <td>{arrayToSentence(assignedApprentices)}</td>
      </tr>
    </>
  );
}
