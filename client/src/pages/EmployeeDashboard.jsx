import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// icons
import { FcLeave, FcViewDetails } from 'react-icons/fc';

const EmployeeDashboard = () => {
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    console.log(user);

  return (
    <div>
      <header>
        <h1 style={{ borderBottom: '2px solid #555', paddingBottom: '10px' }}>Welcome {user ? user.fullname : ""}</h1>
        <h2>Employee Dashboard</h2>
      </header>
      
      <div className="dashboard__container">
        <ul className="menu__list">
          <h3 className="menu__heading">Manage</h3>
          <div className="menu__list-items">
          <li className="menu__list-item"><Link to={`/employee/editDetails/${user._id}`}><FcViewDetails/> Personal Details</Link></li>
          <li className="menu__list-item"><Link to={`/employee/leaveApplication/`}><FcLeave/> Leave Application</Link></li>
          </div>
        </ul>
        </div>
    </div>
  )
}

export default EmployeeDashboard