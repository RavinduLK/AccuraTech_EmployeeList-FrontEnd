import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees"

class EmployeeService {

    // The saveEmployee function is used to save the employee to the database.
    saveEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    // The getEmployees function is used to get all the employees from the database.
    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    // The deleteEmployee function is used to delete an employee from the database.
    deleteEmployee(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
    }

    // The getEmployeeById function is used to get an employee by id from the database.
    getEmployeeById(id) {
        return axios.get(EMPLOYEE_API_BASE_URL + "/" + id);
    }

    // The updateEmployee function is used to update the employee in the database.
    updateEmployee(employee, id) {
        return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, employee);
    }
}

export default new EmployeeService;