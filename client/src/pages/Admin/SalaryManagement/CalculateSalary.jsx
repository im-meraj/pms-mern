import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import { reset } from '../../../features/employee/employeeSlice';
// import { getLeaveApplications } from '../../../features/leave/leaveSlice';

const CalculateSalary = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December']
    const [month, setMonth] = useState(null);
    const [noOfDays, setNoOfDays] = useState(null);

    // const { id } = useParams();

    const { employee, isLoading } = useSelector((state) => state.employee);
    const { leaveApplications } = useSelector((state) => state.leave);

    const dispatch = useDispatch();

    useEffect(() => {

        return () => {
        dispatch(reset());
        };

    }, [dispatch]);

    // Calculate total number of off days
    const calculateTotalNoOfDays = () => {
        let totalNoOfDays = 0;
        leaveApplications.forEach(leaveApplication => {
            if(leaveApplication.Status === 'Approved') {
                totalNoOfDays += leaveApplication.TotalDays;
            }
        });
        return totalNoOfDays;
    }

    const offDays = calculateTotalNoOfDays();
    console.log(offDays);

    // Calculate total number of attended days
    const calculateTotalAttendedDays = () => {
        
    }

    // Total working days calculation
    const onChange = (e) => {
        setMonth(() => (e.target.value));
    };

    const currentYear = new Date().getFullYear();
    const currentMonth = month;

    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    
    const onSubmit = (e) => {
        e.preventDefault();
        setNoOfDays(() => (daysInMonth-4));
    }

    console.log(leaveApplications);

    // DA calculation

    if (isLoading) {
        return <Spinner />;
    }

  return (
    <>
          <div
              style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
              }}
          >
              <Link to="/admin/manageSalary">
                  <FaArrowLeft /> Back to Manage Salary
              </Link>
              <div className="page__heading">
                  <h1>
                      Calculate
                      <br />
                      Employee Salary
                  </h1>
              </div>
          </div>

        <div className="modal__container">
        <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
              <label htmlFor="month">Select Month</label>
              <select className="form-control" id="month" name="month" onChange={onChange}>
                  <option value="">Select Month</option>
                  {months.map((month, index) => (
                      <option key={index} value={index+1}>
                          {month}
                      </option>
                  ))}
              </select>
          </div>

              <div className="form-group">
                  <label htmlFor="month">Select Year</label>
                  <select className="form-control" id="month" name="month" onChange={onChange}>
                      <option value="">Select Year</option>
                      <option value={currentYear}>{currentYear}</option>
                  </select>
              </div>

              <div className="form-group">
                  <button type="submit" className="btn btn-block">Set Month & Year</button>
              </div>
            </form>
        </section>
        </div>

        <div className="table__container">
            <table className="table" cellPadding={5} cellSpacing={30}>
                <thead>
                    <tr>
                        <th>Personal No.</th>
                        <th>Name</th>
                        <th>Basic</th>
                        <th>DA</th>
                        <th>Attended Days</th>
                        <th>Off Days</th>
                        <th>LWP</th>
                        <th>Total Working Days</th>
                        <th>Net Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map((emp, index) => (
                        <tr key={index}>
                            <td>{emp.personalNo}</td>
                            <td>{emp.fullname}</td>
                            <td>{emp.grade.basic}</td>
                            <td>{(emp.grade.basic / 100) * 30}</td>
                            <td>{emp.attendedDays}</td>
                            <td>{offDays}</td>
                            <td>{emp.lwp}</td>
                            <td>{noOfDays}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default CalculateSalary