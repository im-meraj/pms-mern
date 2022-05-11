import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addEmployee, getEmployees } from "../features/employee/employeeSlice";
import { getDepartments } from "../features/department/departmentSlice";
import { getDesignations } from "../features/designation/designationSlice";
import EmployeeTableComponent from '../components/EmployeeTableComponent';

const EmployeeAdd = () => {
  // const { employees } = useSelector((state) => state.employee);
  const { departments } = useSelector((state) => state.department);
  const { designations } = useSelector((state) => state.designation);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getDepartments());
    dispatch(getDesignations());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: "",
    fullname: "",
    email: "",
    dob: "",
    address: "",
    phone: "",
    department: "",
    designation: "",
  });

  const { title, fullname, email, dob, address, phone, department, designation } = formData;

  console.log(formData);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      title,
      fullname,
      email,
      dob,
      address,
      phone,
      department,
      designation,
    }

    dispatch(addEmployee(userData));
    dispatch(getEmployees());

  }

  const titleNames = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"];

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <Link to="/admin"><FaArrowLeft /> Back to Dashboard</Link>
        <div className="page__heading" >
          <h1>Add New<br />Employee</h1>
        </div>
      </div>
      <div className="page__content">
        <section className="form">
          <form onSubmit={onSubmit}>

            <div className="form-group">
              <label htmlFor="fullname">Title</label>
              <select className="form-control" id="title" name="title" onChange={onChange}>
                <option value="">Select Title</option>
                {titleNames.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fullname">Name of the Employee</label>
              <input type="text" className="form-control" id="fullname" name="fullname" placeholder="Enter employee name" onChange={onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Employee Email</label>
              <input type="email" className="form-control" id="email" name="email" placeholder="Enter employee email" onChange={onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" className="form-control" id="dob" name="dob" onChange={onChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" name="address" placeholder="Enter address of employee" onChange={onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone No.</label>
              <input type="tel" className="form-control" id="phone" name="phone" placeholder="Enter phone no. of employee" onChange={onChange} />
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
              <button type="submit" className="btn btn-block">Submit</button>
            </div>
          </form>
        </section>

        <section className="table__employeeAdd">
          <EmployeeTableComponent />
        </section>
      </div>
    </>
  )
}

export default EmployeeAdd