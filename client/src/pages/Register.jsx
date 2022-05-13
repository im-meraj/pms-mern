import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { register } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";


const Register = () => {
  const [formData, setFormData] = useState({
    personalNo: "",
    fullname: "",
    email: "",
    password: "",
    password2: "",
  });

  const { fullname, email, password, password2, personalNo } = formData;

  // console.log(formData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);
  // console.log(user);

  const userJSON = JSON.parse(localStorage.getItem("user"));
  // console.log(userJSON);

  useEffect(() => {
    if (isError) {
      return console.log(message);
    }
    
    try {
      if (!userJSON) {
        navigate("/register");
      } else 
      if (userJSON.role === "employee") {
        navigate("/dashboard");
        console.log(userJSON.role);
      } else {
        navigate("/admin");
        console.log("admin");
      }
    } catch (error) {
      console.log(error);
    }

    // dispatch(reset());

  } , [user, isSuccess, isError, message, navigate, dispatch, userJSON]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(password !== password2) {
      return alert("Passwords do not match");
    } else {
      const userData = {
        personalNo,
        fullname,
        email,
        password,
      }
      dispatch(register(userData));
    }
  }

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>

          <div className="form-group">
            <input type="text" className="form-control" id="personalNo" name="personalNo" value={personalNo} placeholder="Enter employee personal no." onChange={onChange} />
          </div>

          <div className="form-group">
          <input type="text" className="form-control" id="fullname" name="fullname" value={fullname} placeholder="Enter your name" onChange={onChange}/>
          </div>

          <div className="form-group">
            <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange}/>
          </div>

          <div className="form-group">
            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange} />
          </div>

          <div className="form-group">
            <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Re-enter your password" onChange={onChange} />
          </div>

          <div className="form-group">
          <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register