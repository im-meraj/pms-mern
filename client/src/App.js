import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

// Department Components
import DepartmentsTable from "./pages/Department/DepartmentsTable";
import DepartmentAdd from "./pages/Department/DepartmentAdd";
import DepartmentEdit from "./pages/Department/DepartmentEdit";

// Admin - Employee Management Components
import UpdateEmployeeDetails from "./pages/Admin/EmployeeManagement/UpdateEmployeeDetails";
import EmployeesTable from "./pages/Employee/EmployeesTable";
// import EmployeeAdd from "./pages/EmployeeAdd";


// Authentication Components
import Login from "./pages/Login";
import Register from "./pages/Register";

// Designation Components
import Designation from "./pages/Designation/Designation";
import DesignationTable from "./pages/Designation/DesignationTable";
import DesignationUpdate from "./pages/Designation/DesignationUpdate";

// Grade Components
import Grade from "./pages/Grade/Grade";
import GradeTable from "./pages/Grade/GradeTable";
import GradeUpdate from "./pages/Grade/GradeUpdate";

// Employee Components
import EditDetails from "./pages/Employee/EditDetails";

// Leave Applications Components
import LeaveApplication from "./pages/Employee/LeaveApplication";
import ManageLeave from "./pages/Admin/LeaveManagement/ManageLeave";
import EditLeaveStatus from "./pages/Admin/LeaveManagement/EditLeaveStatus";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<EmployeeDashboard />} />
            {/* <Route path="/admin/addEmployee" element={<EmployeeAdd />} /> */}

            {/* Employee Management Routes */}
            <Route path="/admin/editEmployee" element={<UpdateEmployeeDetails />} />
            <Route path="/admin/showEmployees" element={<EmployeesTable />} />

            {/* Department Routes */}
            <Route path="/admin/addDepartment" element={<DepartmentAdd />} />
            <Route
              path="/admin/showDepartments"
              element={<DepartmentsTable />}
            />
            <Route
              path="/admin/editDepartment/:id"
              element={<DepartmentEdit />}
            />
            <Route path="/admin/addDesignation" element={<Designation />} />
            <Route
              path="/admin/showDesignations"
              element={<DesignationTable />}
            />
            <Route
              path="/admin/editDesignation/:id"
              element={<DesignationUpdate />}
            />
            {/* Grade Routes */}
            <Route path="/admin/addGrade" element={<Grade />} />
            <Route path="/admin/showGrades" element={<GradeTable />} />
            <Route path="/admin/editGrade/:id" element={<GradeUpdate />} />

            <Route path="/employee/editDetails/:id" element={<EditDetails />} />

            {/* Leave Management Routes */}
            <Route
              path="/employee/leaveApplication"
              element={<LeaveApplication />}
            />
            <Route
              path="/admin/manageLeaveApplications/"
              element={<ManageLeave />}
            />
            <Route
              path="/admin/editLeaveStatus/:id"
              element={<EditLeaveStatus />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
