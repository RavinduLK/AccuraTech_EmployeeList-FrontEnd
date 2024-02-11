import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../Services/EmployeeService";
import Employee from "./Employee";

// The EmployeeList component is used to display a list of employees from the database.
const EmployeeList = () => {
  // The useNavigate hook is used to navigate to the AddEmployee component when the user clicks the Add Employee button.
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // The useEffect hook is used to fetch the employee data from the database when the component is loaded.
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await EmployeeService.getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // The deleteEmployee function is used to delete an employee from the database.
  const deleteEmployee = (e, id) => {
    e.preventDefault();
    EmployeeService.deleteEmployee(id).then((res) => {
      if (employees) {
        setEmployees((prevElement) => {
          return prevElement.filter((employee) => employee.id !== id);
        });
        window.alert("Employee Deleted Successfully!"); // Show alert message
      }
    });
  };

  // The handleSearch function is used to update the searchQuery state when the user types in the search input field.
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // The filteredEmployees variable is used to filter the employees based on the searchQuery state.
  const filteredEmployees =
    employees &&
    employees.filter((employee) =>
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    // The EmployeeList component contains a table to display the employee data.
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-semibold mb-10 text-center">Accura Member List</h1>
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => navigate("/addEmployee")}
            className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
          >
            Add Employee
          </button>
        </div>
        <div>
          {/* The search input field is used to filter the employees based on the last name. */}
          <input
            type="text"
            placeholder="Search by Last Name"
            value={searchQuery}
            onChange={handleSearch}
            className="rounded border px-2 py-1"
          />
        </div>
      </div>
      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 oppercase tracking py-3 px-6">
                First Name
              </th>
              <th className="text-left font-medium text-gray-500 oppercase tracking py-3 px-6">
                Last Name
              </th>
              <th className="text-left font-medium text-gray-500 oppercase tracking py-3 px-6">
                Date of Birth
              </th>
              <th className="text-left font-medium text-gray-500 oppercase tracking py-3 px-6">
                DS Division
              </th>
              <th className="text-right font-medium text-gray-500 oppercase tracking py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          {/* The Employee component is used to display the employee data in the table. */}
          {!loading && (
            <tbody className="bg-white">
              {filteredEmployees.map((employee) => (
                <Employee
                  employee={employee}
                  deleteEmployee={deleteEmployee}
                  key={employee.id}
                ></Employee>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
