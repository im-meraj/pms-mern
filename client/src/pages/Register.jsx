import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { register } from "../features/auth/authSlice";
import { getDepartments } from "../features/department/departmentSlice";
import { getDesignations } from "../features/designation/designationSlice";
import { getAllGrades } from "../features/grade/gradeSlice";
import Spinner from "../components/Spinner";


const Register = () => {
  const [formData, setFormData] = useState({
    personalNo: "",
    fullname: "",
    email: "",
    password: "",
    password2: "",
    dob: new Date(),
    address: "",
    phone: "",
    department: "",
    designation: "",
    grade: "",
  });

  const { fullname, email, password, password2, personalNo, dob, address, phone, department, designation, grade } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);
  const { departments, isLoading } = useSelector((state) => state.department);
  const { designations } = useSelector((state) => state.designation);
  const { grades } = useSelector((state) => state.grade);

  const userJSON = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (isError) {
      return console.log(message);
    }

    // try {
    //   if (userJSON) {
    //     navigate("/register");
    //   } else 
    //   if (userJSON.role === "employee") {
    //     navigate("/dashboard");
    //     console.log(userJSON.role);
    //   } else {
    //     navigate("/admin");
    //     console.log("admin");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    // dispatch(reset());

  }, [user, isSuccess, isError, message, navigate, dispatch, userJSON]);

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDesignations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllGrades());
  }, [dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  personalNo.toUpperCase();

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
        dob,
        department,
        designation,
        address,
        phone,
        grade,
      }
      dispatch(register(userData));
    }

    setFormData({
      personalNo: "",
      fullname: "",
      email: "",
      password: "",
      password2: "",
      dob: new Date(),
      department: "",
      designation: "",
      address: "",
      phone: "",
      grade: "",
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
        <Link to="/admin">
          <FaArrowLeft /> Back to Dashboard
        </Link>
        <div className="page__heading">
          <h1>
            Add New
            <br />
            Employee
          </h1>
        </div>
      </div>

      <div className="modal__container">

        <section className="form">
          <form onSubmit={onSubmit}>

            <div className="form-group">
              <input type="text" className="form-control" id="personalNo" name="personalNo" value={personalNo} placeholder="Enter employee personal no." onChange={onChange} />
            </div>

            <div className="form-group">
              <input type="text" className="form-control" id="fullname" name="fullname" value={fullname} placeholder="Enter your name" onChange={onChange} />
            </div>

            <div className="form-group">
              <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange} />
            </div>

            <div className="form-group">
              <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange} />
            </div>

            <div className="form-group">
              <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Re-enter your password" onChange={onChange} />
            </div>

            <div className="form-group">
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
              <button type="submit" className="btn btn-block">Submit</button>
            </div>
          </form>
        </section>
      </div>
      {isSuccess && <h3 style={{ color: 'limegreen' }} className="success">Employee was successfully added to Database</h3>}
      {isError && <h3 style={{ color: 'red' }} className="error">You're required to fill out all the fields</h3>}
    </>
  )
}

export default Register