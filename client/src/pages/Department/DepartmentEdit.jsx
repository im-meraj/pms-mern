import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { reset, updateDepartment } from '../../features/department/departmentSlice';

const DepartmentEdit = () => {
    const { id } = useParams();

    const { isSuccess, isError } = useSelector((state) => state.department);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        deptId: "",
        name: "",
    });

    const { deptId, name } = formData;

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
            id,
        }
        console.log(deptData);

        dispatch(updateDepartment(deptData));

        setFormData({
            deptId: "",
            name: "",
        });

    }

  return (
    <>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <Link to="/admin/showDepartments"><FaArrowLeft /> Back to Dashboard</Link>
              <div className="page__heading" >
                  <h1>Edit<br />Department Details</h1>
              </div>
          </div>

        <div className="modal__container">
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
        </div>
          {isSuccess && <div className="alert alert-success">Department updated successfully</div>}
          {isError && <div className="alert alert-danger">Department not updated</div>}
    </>
  )
}

export default DepartmentEdit