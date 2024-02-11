import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddEmployee from "./Components/AddEmployee";
import EmployeeList from "./Components/EmployeeList";
import Navbar from "./Components/Navbar";
import UpdateEmployee from "./Components/UpdateEmployee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* The index route is used to display the EmployeeList component when
          the app is loaded. */}
          <Route index element={<EmployeeList />} />
          {/* The route for the EmployeeList component. */}
          <Route path="/" element={<EmployeeList />} />
          {/* The route for the AddEmployee component. */}
          <Route path="/employeeList" element={<EmployeeList />} />
          {/* The route for the AddEmployee component. */}
          <Route path="/addEmployee" element={<AddEmployee />} />
          {/* The route for the UpdateEmployee component. */}
          <Route path="/editEmployee/:id" element={<UpdateEmployee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
