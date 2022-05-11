import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { reset, updateDesignation } from '../../features/designation/designationSlice';

const DesignationUpdate = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[3];
    console.log(path);

    // const { id } = useParams();
    // console.log(id);

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
            path,
        }

        dispatch(updateDesignation(designationData));

        setFormData({
            designationId: "",
            name: "",
        });

    }
  return (
      <>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <Link to="/admin/showDesignations"><FaArrowLeft /> Back to Designations</Link>
              <div className="page__heading" >
                  <h1>Update<br />Designation</h1>
              </div>
          </div>
          <section className="form">
              <form onSubmit={onSubmit}>
                  <div className="form-group">
                      <label htmlFor="designationId">Designation ID</label>
                      <input type="text" className="form-control" id="designationId" name="designationId" placeholder="Enter new designation ID" onChange={onChange} />
                  </div>

                  <div className="form-group">
                      <label htmlFor="name">Name of the Designation</label>
                      <input type="text" className="form-control" id="name" name="name" placeholder="Enter new designation name" onChange={onChange} />
                  </div>


                  <div className="form-group">
                      <button type="submit" className="btn btn-block">Submit</button>
                  </div>
              </form>
          </section>
          {isSuccess && <div className="alert alert-success">Designation updated successfully</div> }
          {isError && <div className="alert alert-danger">Designation not updated</div> }
      </>
  )
}

export default DesignationUpdate