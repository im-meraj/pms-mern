import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getSpecificEmployee } from "../features/employee/employeeSlice";



const EmployeeTableComponent = () => {
  const employees = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();
  
  return (
    <>
    <div className="table__container">
    {employees.length > 0 ? (
      <table className="table" cellPadding={5} cellSpacing={30}>
        <thead>
          <tr>
            <th>Personal No.</th>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Date of Birth</th> */}
            <th>Address</th>
            <th>Phone No.</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.personalNo}</td>
              <td>{employee.fullname}</td>
              <td>{employee.email}</td>
              {/* <td>{new Date(employee.dob).toLocaleDateString()}</td> */}
              <td>{employee.address}</td>
              <td>{employee.phone === null ? 'Unavailable' : employee.phone}</td>
              <td>{employee.department.name}</td>
              <td>{employee.designation.name}</td>
              <td>
              <Link to={`/admin/editEmployee/${employee._id}`}>
                <button className="btn-secondary btn-edit" style={{ fontSize: '12px' }} onClick={() => {
                  dispatch(getSpecificEmployee(employee._id));
                }}><FiEdit/></button>
              </Link>
                <button className="btn-danger btn-delete" style={{ fontSize: '12px' }}><RiDeleteBin6Line/></button>
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

export default EmployeeTableComponent