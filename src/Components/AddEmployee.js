import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EmployeeService from "../Services/EmployeeService";
import { useNavigate } from "react-router-dom";

// The AddEmployee component is used to add a new employee to the database.
const AddEmployee = () => {
  const [error, setError] = useState(""); // State to store validation error message
  const [employee, setEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    summary: "",
    dob: new Date(),
    dsDivision: "",
  });

  // The useNavigate hook is used to navigate to the EmployeeList component after adding a new employee.
  const navigate = useNavigate();

  // The handleChange function is used to update the employee state when the user types in the input fields.
  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({
      ...employee,
      [e.target.name]:
        e.target.name === "summary" ? value.toUpperCase() : value,
    });
  };

  // The handleDateChange function is used to update the employee state when the user selects a date from the date picker.
  const handleDateChange = (date) => {
    setEmployee({ ...employee, dob: date });
  };

  // The saveEmployee function is used to save the employee to the database.
  const saveEmployee = (e) => {
    e.preventDefault();
    // Check if Last Name is provided
    if (!employee.lastName.trim()) {
      setError("*Last Name is required");
      return;
    }
    // If Last Name is provided, clear any previous error
    setError("");
    EmployeeService.saveEmployee(employee)
      .then((response) => {
        console.log(response);
        window.alert("Employee Added Successfully!"); // Show alert message
        navigate("/employeeList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // The reset function is used to clear the input fields when the user clicks the Clear button.
  const reset = (e) => {
    e.preventDefault();
    setEmployee({
      id: "",
      firstName: "",
      lastName: "",
      summary: "",
      dob: new Date(),
      dsDivision: "",
    });
    setError("");
  };

  return (
    // The AddEmployee component contains input fields for the first name, last name, summary, date of birth, and DS division.
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Add Accura Member</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-10">
          <label className="block text-gray-600 text-sm font-normal">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-10">
          <label className="block text-gray-600 text-sm font-normal">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
          {error && (
            <div className="text-red-500 text-sm font-normal">{error}</div>
          )}
        </div>
        <div className="items-center justify-center h-14 w-full my-10">
          <label className="block text-gray-600 text-sm font-normal">
            Summary
          </label>
          <textarea
            name="summary"
            value={employee.summary}
            onChange={(e) => handleChange(e)}
            className="h-32 w-96 border mt-2 px-2 py-2"
          />
        </div>
        <div className="items-center justify-center h-14 w-full mt-32">
          <label className="block text-gray-600 text-sm font-normal">
            Date of Birth
          </label>
          <DatePicker
            selected={employee.dob}
            onChange={handleDateChange}
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            showMonthDropdown
            scrollableMonthYearDropdown
            yearDropdownItemNumber={40}
            dateFormat="dd/MM/yyyy"
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>
        <div className="items-center justify-center h-14 w-full mt-10">
          <label className="block text-gray-600 text-sm font-normal">
            DS Division
          </label>
          <select
            name="dsDivision"
            value={employee.dsDivision}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          >
            <option value="" disabled>
              Select DS Division
            </option>
            <option value="Colombo 1">Colombo 1</option>
            <option value="Colombo 2">Colombo 2</option>
            <option value="Colombo 3">Colombo 3</option>
          </select>
        </div>
        {/* The Save and Clear buttons are used to save the employee to the database and clear the input fields, respectively. */}
        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-8">
          <button
            onClick={saveEmployee}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 px-6 py-2"
          >
            Save
          </button>
          <button
            onClick={reset}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 px-6 py-2"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
