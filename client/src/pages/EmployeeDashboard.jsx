import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// icons
import { FcLeave, FcViewDetails, FcMoneyTransfer } from 'react-icons/fc';

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // console.log(user);

  return (
    <div>
      <header>
        <h1 style={{ borderBottom: '2px solid #555', paddingBottom: '10px' }}>Welcome {user ? user.fullname : ""}</h1>
        <h2>Employee Dashboard</h2>
      </header>

      <div className="dashboard__container">
        <div className="employee__container">
        <div className="left__img__emp">
            <img src="https://res.cloudinary.com/immeraj/image/upload/v1656421299/pms/undraw_Predictive_analytics_re_wxt8_wtam7d.png" alt="" />
        </div>
          <ul className="menu__list">
            <h3 className="menu__heading">View</h3>
            <div className="menu__list-items">
              <li className="menu__list-item"><Link to={`/employee/showDetails/${user._id}`}><FcViewDetails /> Personal Details</Link></li>
              {/* <li className="menu__list-item"><Link to={`/employee/leaveApplication/`}><FcLeave /> Leave Application</Link></li> */}
              <li className="menu__list-item"><Link to={`/employee/salaryDetails/${user._id}`}><FcMoneyTransfer /> Salary Details</Link></li>
            </div>
          </ul>

          <ul className="menu__list">
            <h3 className="menu__heading">Manage</h3>
            <div className="menu__list-items">
              {/* <li className="menu__list-item"><Link to={`/employee/showDetails/${user._id}`}><FcViewDetails /> Personal Details</Link></li> */}
              <li className="menu__list-item"><Link to={`/employee/leaveApplication/`}><FcLeave /> Leave Application</Link></li>
              {/* <li className="menu__list-item"><Link to={`/employee/salaryDetails/${user._id}`}><FcMoneyTransfer /> Salary Details</Link></li> */}
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard