import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'

const DepartmentEdit = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    console.log(path);

    const [formData, setFormData] = useState({
        deptId: "",
        name: "",
    });

    const { deptId, name } = formData;

    const dispatch = useDispatch();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const deptData = {
            deptId,
            name,
        }
        console.log(deptData);

        dispatch();

    }
  return (
    <>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <Link to="/admin"><FaArrowLeft /> Back to Dashboard</Link>
              <div className="page__heading" >
                  <h1>Edit<br />Department Details</h1>
              </div>
          </div>
          <section className="form">
              <form onSubmit={onSubmit}>
                  <div className="form-group">
                      <label htmlFor="deptId">Department ID</label>
                      <input type="text" className="form-control" id="deptId" name="deptId" placeholder="Enter department id" onChange={onChange} />
                  </div>

                  <div className="form-group">
                      <label htmlFor="name">Name of the Department</label>
                      <input type="text" className="form-control" id="name" name="name" placeholder="Enter department name" onChange={onChange} />
                  </div>


                  <div className="form-group">
                      <button type="submit" className="btn btn-block">Submit</button>
                  </div>
              </form>
          </section>
    </>
  )
}

export default DepartmentEdit