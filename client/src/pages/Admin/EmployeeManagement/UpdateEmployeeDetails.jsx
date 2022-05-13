import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const UpdateEmployeeDetails = () => {
    const { isSuccess, isError } = useSelector((state) => state.designation);

    const dispatch = useDispatch();

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

    const { designationId, name } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            
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
            Add new
            <br />
            Employee
          </h1>
        </div>
      </div>

    <section className="form">
              <form onSubmit={onSubmit}>
                  <div className="form-group">
                      <label htmlFor="designationId">Designation ID</label>
                      <input type="text" className="form-control" id="designationId" name="designationId" placeholder="Enter designation id" onChange={onChange} />
                  </div>

                  <div className="form-group">
                      <label htmlFor="name">Name of the Designation</label>
                      <input type="text" className="form-control" id="name" name="name" placeholder="Enter designation name" onChange={onChange} />
                  </div>


                  <div className="form-group">
                      <button type="submit" className="btn btn-block">Submit</button>
                  </div>
              </form>
          </section>
          {isSuccess && <div className="alert alert-success">Designation added successfully</div>}
          {isError && <div className="alert alert-danger">Failed to add designation</div>}
    </>
  );
};

export default UpdateEmployeeDetails;
