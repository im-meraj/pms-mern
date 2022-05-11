import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DepartmentsTable from './pages/Department/DepartmentsTable';
import DepartmentAdd from './pages/Department/DepartmentAdd';
import EmployeesTable from './pages/Employee/EmployeesTable';
import EmployeeAdd from './pages/EmployeeAdd';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import DepartmentEdit from './pages/Department/DepartmentEdit';
import Designation from './pages/Designation/Designation';
import DesignationTable from './pages/Designation/DesignationTable';
import DesignationUpdate from './pages/Designation/DesignationUpdate';
import EditDetails from './pages/Employee/EditDetails';
import LeaveApplication from './pages/Employee/LeaveApplication';
import ManageLeave from './pages/Admin/LeaveManagement/ManageLeave';

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
            <Route path="/admin/addEmployee" element={<EmployeeAdd />} />
            <Route path="/admin/showEmployees" element={<EmployeesTable />} />
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
            <Route path="/employee/editDetails/:id" element={<EditDetails />} />
            <Route
              path="/employee/leaveApplication"
              element={<LeaveApplication />}
            />
            <Route
              path="/admin/manageLeaveApplications/"
              element={<ManageLeave />}
            />
            <Route
              path="/admin/manageLeaveApplications/:id"
              element={<ManageLeave />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
