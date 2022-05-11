import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addDepartment, deleteDepartment, getDepartments } from '../../features/department/departmentSlice'

const DepartmentAdd = () => {
    const { departments } = useSelector((state) => state.department);

    const [formData, setFormData] = useState({
        deptId: "",
        name: "",
    });

    const { deptId, name } = formData;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDepartments());
    }, [dispatch]);

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

        dispatch(addDepartment(deptData));
        dispatch(getDepartments());

    }

  return (
      <>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <Link to="/admin"><FaArrowLeft /> Back to Dashboard</Link>
              <div className="page__heading" >
                  <h1>Add New<br />Department</h1>
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

          <div className="table__container">
              {departments.length > 0 ? (
                  <table className="table" cellPadding={5} cellSpacing={30}>
                      <thead>
                          <tr>
                              <th>Dept ID</th>
                              <th>Department Name</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {departments.map((department, index) => (
                              <tr key={index}>
                                  <td>{department.deptId}</td>
                                  <td>{department.name}</td>
                                  
                                  <td>
                                      <button className="btn-secondary btn-edit" style={{ fontSize: '12px' }}><FiEdit /></button>
                                      <button className="btn-danger btn-delete" style={{ fontSize: '12px' }} onClick={() => {
                                          const confirmBox = window.confirm('Are you sure you want to delete this department?');
                                            if (confirmBox) {
                                                dispatch(deleteDepartment(department._id));
                                                setTimeout(() => {
                                                    dispatch(getDepartments());
                                                }, 1000);
                                            }
                                      }}><RiDeleteBin6Line /></button>
                                  </td>
                              </tr>
                          )).reverse()}
                      </tbody>
                  </table>
              ) : (<h3>No Departments</h3>)}
          </div>
      </>
  )
}

export default DepartmentAdd