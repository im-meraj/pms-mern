import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const UpdateEmployeeDetails = () => {
    const { isSuccess, isError } = useSelector((state) => state.designation);

    const dispatch = useDispatch();

    const [personalNo, setPersonalNo] = useState("");

    const [formData, setFormData] = useState({
        personalNo: "",
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: new Date(),
        address: "",
        phone: "",
        designation: "",
    });

    const { } = formData;

    const onChange = (e) => {
        setPersonalNo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            
        }

    const onSubmit = (e) => {
        e.preventDefault();
    }

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
            Search <br/>Employee to Update
          </h1>
        </div>
      </div>

    <section className="form">
              <form onSubmit={onSubmit}>
                  <div className="form-group">
                      <label htmlFor="personalNo">Enter Personal Number to get the employee</label>
                      <input type="text" className="form-control" id="personalNo" name="personalNo" placeholder="Enter Personal Number" onChange={onChange} />
                  </div>

                  <div className="form-group">
                      <button type="submit" className="btn btn-block">Get Details</button>
                  </div>
              </form>
          </section>
          {isSuccess && <div className="alert alert-success">Fetched Details for {}</div>}
          {isError && <div className="alert alert-danger">No employee found with this Personal no.</div>}
    </>
  );
};

export default UpdateEmployeeDetails;
