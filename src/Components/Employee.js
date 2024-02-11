import React from "react";
import { useNavigate } from "react-router-dom";

// The Employee component is used to display the employee data in the EmployeeList component.
const Employee = ({ employee, deleteEmployee }) => {
  // The useNavigate hook is used to navigate to the EditEmployee component when the user clicks the Edit button.
  const navigate = useNavigate();

  // The editEmployee function is used to navigate to the EditEmployee component when the user clicks the Edit button.
  const editEmployee = (e, id) => {
    e.preventDefault();
    navigate(`/editEmployee/${id}`);
  };

  return (
    <tr key={employee.id}>
      {/* The employee data is displayed in the table rows. */}
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.firstName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.lastName + "_" + employee.summary}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{new Date(employee.dob).toLocaleDateString()}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.dsDivision}</div>
      </td>
      {/* The Edit and Delete buttons are used to navigate to the EditEmployee component and delete an employee from the database. */}
      <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
        <a
          onClick={(e, id) => editEmployee(e, employee.id)}
          className="text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer"
        >
          Edit
        </a>
        <a
          onClick={(e, id) => deleteEmployee(e, employee.id)}
          className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer"
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default Employee;
