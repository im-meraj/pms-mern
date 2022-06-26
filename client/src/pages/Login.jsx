import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
  const errRef = useRef();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // console.log(formData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  // console.log(user);

  const userJSON = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (isError) {
      return console.log(message);
    }
    
    try {
      if (!userJSON) {
        navigate("/");
      } else if (userJSON.role === "employee") {
        navigate("/dashboard");
        console.log("employee");
      } else {
        navigate("/admin");
        console.log("admin");
      }
    } catch (error) {
      console.log(error);
    }

    dispatch(reset());

  }, [user, isSuccess, isError, message, navigate, dispatch, userJSON]);


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value

    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    }

    dispatch(login(userData));
  }

  // const customId = "warning";

  // if (isError) {
  //   toast.error('⛔ Login Failed! Try Again!!', {
  //     toastId: customId,
  //     position: "bottom-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer />
      
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to your account</p>
      </section>
      <div className="login__container">
      <div className="left__bg">

      </div>
      
      <section className="form login__form">
        <form onSubmit={onSubmit}>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange} required/>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange} required/>
          </div>
         
          <div className="form-group">
            <button type="submit" className="btn btn-block" >Login</button>
          </div>
        </form>

        <p ref={errRef} className={message ? "alert alert--error" : ""}>{message}</p> 
      </section>
      </div>
      
    </>
  )
}

export default Login