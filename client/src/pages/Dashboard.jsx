import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUserTie } from "react-icons/fa";
import { FcLeave, FcDepartment, FcBriefcase, FcMoneyTransfer, FcBarChart } from "react-icons/fc";
import { MdPersonAdd } from "react-icons/md";


const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="container">
      <header><h1>Welcome {user ? user.fullname : ""}<br />Admin Dashboard</h1></header>
      <div className="dashboard__container">
        <ul className="menu__list">
          <h3 className="menu__heading">Employee</h3>
          <li className="menu__list-item"><Link to="/register"><MdPersonAdd /> Add New Employee</Link></li>
          {/* <li className="menu__list-item"><Link to="/admin/searchEmployee"><FaUserTie /> Update Employee Details</Link></li> */}
          <li className="menu__list-item"><Link to="/admin/showEmployees"><FaUserTie /> Display & Manage Employees</Link></li>
        </ul>

        <ul className="menu__list">
          <h3 className="menu__heading">Department</h3>
          <li className="menu__list-item"><Link to="/admin/addDepartment"><FcDepartment /> Add Department</Link></li>
          <li className="menu__list-item"><Link to="/admin/showDepartments"><FcDepartment /> Display & Manage Departments</Link></li>
        </ul>

        <ul className="menu__list">
          <h3 className="menu__heading">Designation</h3>
          <li className="menu__list-item"><Link to="/admin/addDesignation"><FcBriefcase /> Add Designation</Link></li>
          <li className="menu__list-item"><Link to="/admin/showDesignations"><FcBriefcase /> Display & Manage Designations</Link></li>
        </ul>

        <ul className="menu__list">
          <h3 className="menu__heading">Pay Grade</h3>
          <li className="menu__list-item"><Link to="/admin/addGrade"><FcBarChart /> Add Pay Grade</Link></li>
          <li className="menu__list-item"><Link to="/admin/showGrades"><FcBarChart /> Display & Manage Grades</Link></li>
        </ul>

        <ul className="menu__list">
          <h3 className="menu__heading">Salary</h3>
          <li className="menu__list-item"><Link to="/admin/showSalary"><FcMoneyTransfer /> Show Salary</Link></li>
        </ul>

        <ul className="menu__list">
          <h3 className="menu__heading">Leave Applications</h3>
          <li className="menu__list-item"><Link to="/admin/manageLeaveApplications"><FcLeave /> Manage Leave Applications</Link></li>
        </ul>

      </div>
    </div>
  )
}

export default Dashboard