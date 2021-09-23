import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "reactstrap";

export default function EmployeeAttributes(props) {
  const { employee, projects } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const disableDelete = !_.isEmpty(employee.projects);

  return (
    <>
      <tr>
        <td onClick={toggle} style={{ cursor: "pointer" }}>
          {isOpen ? "-" : "+"}
        </td>
        <td>{employee.id}</td>
        <td>{employee.fname}</td>
        <td>{employee.lname}</td>
        <td>
          <Link to={`employees/${employee.id}/edit`}>
            <Button size="sm">Edit</Button>
          </Link>{" "}
        </td>
      </tr>
      {isOpen && (
        <>
          <tr>
            <th></th>
            <th>Project ID</th>
            <th>Project Name</th>
          </tr>
          {_.map(employee.projects, (emp) => {
            const assignedProject = _.find(
              projects,
              (p) => p.id == emp?.project_id
            );
            return (
              <tr key={emp?.project_id}>
                <td></td>
                <td>{emp?.project_id}</td>
                <td>{assignedProject?.name}</td>
              </tr>
            );
          })}
        </>
      )}
    </>
  );
}
