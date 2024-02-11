import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../Services/EmployeeService";
import DatePicker from "react-datepicker";

// The UpdateEmployee component is used to update an existing employee in the database.
const UpdateEmployee = () => {
  const [error, setError] = useState(""); // State to store validation error message
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    id: id,
    firstName: "",
    lastName: "",
    summary: "",
    dob: new Date(),
    dsDivision: "",
  });

  // The handleChange function is used to update the employee state when the user types in the input fields.
  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({
      ...employee,
      [e.target.name]:
        e.target.name === "summary" ? value.toUpperCase() : value,
    });
  };

  const handleDateChange = (date) => {
    setEmployee({ ...employee, dob: date });
  };

  // The useEffect hook is used to fetch the employee data from the database when the component is loaded.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeService.getEmployeeById(id);
        setEmployee(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  // The updateEmployee function is used to update the employee in the database.
  const updateEmployee = (e) => {
    e.preventDefault();
    // Check if Last Name is provided
    if (!employee.lastName.trim()) {
      setError("*Last Name is required");
      return;
    }
    // If Last Name is provided, clear any previous error
    setError("");
    EmployeeService.updateEmployee(employee, id)
      .then((response) => {
        console.log(response);
        window.alert("Employee Updated Successfully!"); // Show alert message
        navigate("/employeeList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // The UpdateEmployee component contains input fields for the first name, last name, summary, date of birth, and DS division.
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Update Accura Member</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-8">
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
        <div className="items-center justify-center h-14 w-full my-8">
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
        <div className="items-center justify-center h-14 w-full my-8">
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
            <option value="">Select DS Division</option>
            <option value="Colombo 1">Colombo 1</option>
            <option value="Colombo 2">Colombo 2</option>
            <option value="Colombo 3">Colombo 3</option>
          </select>
        </div>
        {/* The UpdateEmployee component contains buttons to update the employee and to cancel the update process. */}
        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-8">
          <button
            onClick={updateEmployee}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 px-6 py-2"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/employeeList")}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 px-6 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
