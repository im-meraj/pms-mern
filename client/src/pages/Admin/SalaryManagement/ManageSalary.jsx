import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';
import { FcCalculator } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, getSpecificEmployee } from '../../../features/employee/employeeSlice';
import { useEffect } from 'react';
import { getLeaveApplicationsById } from '../../../features/leave/leaveSlice';

const ManageSalary = () => {
    const employees = useSelector((state) => state.employee.employees);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch])
    
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
              <Link to="/admin">
                  <FaArrowLeft /> Back to Dashboard
              </Link>
              <div className="page__heading">
                  <h1>
                      Manage
                      <br />
                      Employee Salary
                  </h1>
              </div>
          </div>

          <div className="table__container">
              {employees.length > 0 ? (
                  <table className="table" cellPadding={5} cellSpacing={30}>
                      <thead>
                          <tr>
                              <th>Personal No.</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone No.</th>
                              <th>Department</th>
                              <th>Designation</th>
                              <th>Pay Grade</th>
                              <th>Manage</th>
                          </tr>
                      </thead>
                      <tbody>
                          {employees.map((employee, index) => (
                              <tr key={index}>
                                  <td>{employee.personalNo}</td>
                                  <td>{employee.fullname}</td>
                                  <td>{employee.email}</td>
                                  {/* <td>{new Date(employee.dob).toLocaleDateString()}</td>
              <td>{employee.address}</td> */}
                                  <td>{employee.phone}</td>
                                  <td>{employee.department.name}</td>
                                  <td>{employee.designation.name}</td>
                                    <td>{employee.grade.gradeName}</td>
                                  <td>
                                      <Link to={`/admin/calculateSalary/${employee._id}`}>
                                          <button className="btn-payment btn-pay" onClick={() => {
                                              dispatch(getSpecificEmployee(employee._id));
                                              dispatch(getLeaveApplicationsById(employee._id));
                                          }}><FcCalculator /></button>
                                      </Link>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              ) : (<h3>No Employees</h3>)}
          </div>
    </>
  )
}

export default ManageSalary