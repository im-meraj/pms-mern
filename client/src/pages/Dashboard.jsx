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
      <header>
        <h1 style={{ borderBottom: '2px solid #555', paddingBottom: '10px' }}>Welcome {user ? user.fullname : ""}</h1>
        <h2>Admin Dashboard</h2>
      </header>
      <div className="dashboard__container">
        {/* <div className="admin__container">

          <div className="left__img__admin">
            <img src="https://res.cloudinary.com/immeraj/image/upload/v1656423303/pms/undraw_All_the_data_re_hh4w_fqcll3.png" alt="" />
          </div>

          <div className="admin__menu"> */}

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
              <li className="menu__list-item"><Link to="/admin/manageSalary"><FcMoneyTransfer /> Manage Salary</Link></li>
            </ul>

            <ul className="menu__list">
              <h3 className="menu__heading">Leave Applications</h3>
              <li className="menu__list-item"><Link to="/admin/manageLeaveApplications"><FcLeave /> Manage Leave Applications</Link></li>
            </ul>

          {/* </div> */}
        {/* </div> */}
        
      </div>
    </div>
  )
}

export default Dashboard