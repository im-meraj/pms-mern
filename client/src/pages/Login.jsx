import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to your account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          
          <div className="form-group">
            <input type="text" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange} />
          </div>

          <div className="form-group">
            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange} />
          </div>
         
          <div className="form-group">
            <button type="submit" className="btn btn-block">Login</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login