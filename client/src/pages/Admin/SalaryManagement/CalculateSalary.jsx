import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import { reset } from '../../../features/employee/employeeSlice';
// import { getLeaveApplications } from '../../../features/leave/leaveSlice';

const CalculateSalary = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December']
    const [month, setMonth] = useState(null);
    // const [daysInMonth, setDaysInMonth] = useState(null);
    const [attendedDays, setAttendedDays] = useState("");
    const [lwpDays, setLwpDays] = useState("");
    const [noOfDays, setNoOfDays] = useState("");
    const [netSalary, setNetSalary] = useState("");

    const { id } = useParams();

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

    // Calculate number of lwp days
    const calculateLwpDays = () => {
        let totalLwpDays = 0;
        leaveApplications.forEach(leaveApplication => {
            if(leaveApplication.Status === 'Approved' && leaveApplication.LeaveType === 'Loss') {
                totalLwpDays += leaveApplication.TotalDays;
            }
        });

        return totalLwpDays;
    }

    const lwp = calculateLwpDays();

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

    // Extract object from array of employee
    const employeeObject = employee.find((employee) => employee._id === id);

    // Calculate net salary
    const calculateNetSalary = (employee) => {
        let netSalary = 0;
        if(employee) {
            let basicSalary = employee.grade.basic;
            let da = (basicSalary / 100) * 30;
            let bd = basicSalary + da;
            let perDaySalary = Math.round(bd / 27-4);
            let totalDays = attendedDays+offDays-lwp;
            console.log(totalDays);
            netSalary = perDaySalary * totalDays;
        }
        return netSalary;
    }

    const net = calculateNetSalary(employeeObject);
    
    const onSubmit = (e) => {
        e.preventDefault();
        setNoOfDays(() => (daysInMonth-4));
        setAttendedDays(() => (daysInMonth-4-offDays));
        setLwpDays(() => (lwp));
        // setNetSalary(() => (net));
    }

    const handleClick = () => {
        setNetSalary(() => (net));
    }

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

              <div className="form-group">
                  <button type="button" className="btn btn-block" onClick={handleClick}>Calculate Net Salary</button>
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
                            <td>{attendedDays}</td>
                            <td>{offDays}</td>
                            <td>{lwpDays}</td>
                            <td>{noOfDays}</td>
                            <td>{netSalary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default CalculateSalary