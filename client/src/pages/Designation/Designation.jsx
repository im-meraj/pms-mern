import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { addDesignation, getDesignations, reset } from "../../features/designation/designationSlice";

const Designation = () => {
    const { isSuccess, isError } = useSelector((state) => state.designation);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        designationId: "",
        name: "",
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

        const designationData = {
            designationId,
            name,
        }

        dispatch(addDesignation(designationData));
        dispatch(getDesignations());

    }


  return (
    <>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <Link to="/admin"><FaArrowLeft /> Back to Dashboard</Link>
              <div className="page__heading-desa" >
                  <h1>Add New<br />Designation</h1>
              </div>
          </div>

          <div className="modal__container">
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
          </div>
          {isSuccess && <div className="alert alert-success">Designation added successfully</div>}
          {isError && <div className="alert alert-danger">Failed to add designation</div>}
    </>
  )
}

export default Designation