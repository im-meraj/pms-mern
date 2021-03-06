import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

// Icons
import { FaArrowLeft } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import { getDepartments } from '../../../features/department/departmentSlice';
import { getDesignations } from '../../../features/designation/designationSlice';
import { getAllGrades } from '../../../features/grade/gradeSlice';
import { getSpecificEmployee, reset, updateEmployee } from '../../../features/employee/employeeSlice';
import Spinner from '../../../components/Spinner';

const UpdateEmployee = () => {
  const { employee, isLoading } = useSelector((state) => state.employee);
  const { departments } = useSelector((state) => state.department);
  const { designations } = useSelector((state) => state.designation);
  const { grades } = useSelector((state) => state.grade);

  const dispatch = useDispatch();
  const { id } = useParams();

  const employeeObj = employee.find((emp) => emp._id === id);
  console.log(employeeObj);

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDesignations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllGrades());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    }
  }, [dispatch]);

  const [formData, setFormData] = useState({
    personalNo: employee.personalNo,
    fullname: employee.fullname,
    email: employee.email,
    password: employee.password,
    password2: employee.password,
    phone: employee.phone,
    address: employee.address,
    department: "",
    designation: "",
    grade: "",
    role: "",
  });

  const { fullname, email, password, password2, personalNo, department, designation, phone, grade, address, role } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      return alert("Passwords do not match");
    } else {
      const userData = {
        personalNo,
        fullname,
        email,
        password,
        department,
        designation,
        phone,
        grade,
        id,
        address,
        role,
      }
      dispatch(updateEmployee(userData));
      // dispatch(reset());
      dispatch(getSpecificEmployee(id));
    }

    setFormData({
      personalNo: employee.personalNo,
      fullname: employee.fullname,
      email: employee.email,
      password: employee.password,
      password2: employee.password,
      department: "",
      designation: "",
      phone: employee.phone,
      grade: "",
      address: employee.address,
      role: "",
    });
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
          justifyContent: "space-around",
        }}
      >
        <Link to="/admin/showEmployees">
          <FaArrowLeft /> Back to Dashboard
        </Link>
        <div className="page__heading">
          <h1>
            Update <br />Employee Details
          </h1>
        </div>
      </div>

      <div className="container">
        <div className="page__content--top">
          {
            employee.length > 0 ? (
              <table className="table" cellPadding={5} cellSpacing={30}>
                <thead>
                  <tr>
                    <th>Personal No.</th>
                    <th>Name of the employee</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>Address</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Pay Grade</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody>

                  {employee.map((emp, index) => (
                    <tr key={index}>
                      <td>{emp.personalNo}</td>
                      <td>{emp.fullname}</td>
                      <td>{emp.email}</td>
                      <td>{emp.phone}</td>
                      <td>{emp.address}</td>
                      <td>{employeeObj.department && employeeObj.department.name}</td>
                      <td>{employeeObj.designation && employeeObj.designation.name}</td>
                      <td>{employeeObj.grade && employeeObj.grade.gradeName}</td>
                      <td>{emp.role}</td>
                      {/* <td>{emp.department.length > 0 ? emp.department[0].name : emp.department[0]}</td> */}
                      {/* <td>{emp.designation.length > 0 ? emp.designation[0].name : emp.designation[0]}</td> */}
                    </tr>
                  ))}

                </tbody>
              </table>
            ) : (<h3>No Employee Data</h3>)
          }
        </div>

        <h2 style={{color: 'red', marginTop: '40px'}}>Refilling of all fields are required</h2>
        <span className="smText">(Refer to above table)</span>
        
        <div className="modal__container">
        <section className="form">
          <form onSubmit={onSubmit}>

            <div className="form-group">
              <label htmlFor="personalNo">Personal No.</label>
              <input type="text" className="form-control" id="personalNo" name="personalNo" value={personalNo} placeholder="Enter new employee personal no" onChange={onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="fullname">Name of the Employee</label>
              <input type="text" className="form-control" id="fullname" name="fullname" value={fullname} placeholder="Enter new employee name" onChange={onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter new employee email" onChange={onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" className="form-control" id="phone" name="phone" value={phone} placeholder="Enter new employee phone no." onChange={onChange} />
            </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" name="address" value={address} placeholder="Enter new employee address" onChange={onChange} />
              </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter new employee password" onChange={onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Re-enter password" onChange={onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select className="form-control" id="department" name="department" onChange={onChange}>
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="designation">Designation</label>
              <select className="form-control" id="designation" name="designation" onChange={onChange}>
                <option value="">Select Designation</option>
                {designations.map((designation) => (
                  <option key={designation._id} value={designation._id}>
                    {designation.name}
                  </option>
                ))}
              </select>
            </div>

              <div className="form-group">
                <label htmlFor="grade">Grade</label>
                <select className="form-control" id="grade" name="grade" onChange={onChange}>
                  <option value="">Select Grade</option>
                  {grades.map((grade) => (
                    <option key={grade._id} value={grade._id}>
                      {grade.gradeName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select className="form-control" id="role" name="role" onChange={onChange}>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>

            <div className="form-group">
              <button type="submit" className="btn btn-block">Update Employee Details</button>
            </div>
          </form>
        </section>
      </div>
      </div>
    </>
  )
}

export default UpdateEmployee