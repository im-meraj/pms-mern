import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { reset, updateDesignation } from '../../features/designation/designationSlice';

const GradeUpdate = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[3];
    console.log(path);

    // const { id } = useParams();
    // console.log(id);

    const { isSuccess, isError } = useSelector((state) => state.grade);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);



    const [formData, setFormData] = useState({
        gradeId: "",
        gradeName: "",
        basic: 0,
    });

    const { gradeId, gradeName, basic } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const gradeData = {
            gradeId,
            gradeName,
            basic,
            path,
        }

        dispatch(updateDesignation(gradeData));

        setFormData({
            gradeId: "",
            gradeName: "",
            basic: 0,
        });

    }
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Link to="/admin/showDesignations"><FaArrowLeft /> Back to Grades</Link>
                <div className="page__heading" >
                    <h1>Update<br />Pay Grade</h1>
                </div>
            </div>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="gradeId">New Pay Grade ID</label>
                        <input type="text" className="form-control" id="gradeId" name="gradeId" placeholder="Enter new Pay Grade ID" onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gradeName">New Name of the Pay Grade</label>
                        <input type="text" className="form-control" id="gradeName" name="gradeName" placeholder="Enter new Pay Grade name" onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="basic">New Basic Salary</label>
                        <input type="number" className="form-control" id="basic" name="basic" placeholder="Enter new Basic Salary" onChange={onChange} />
                    </div>


                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
            {isSuccess && <div className="alert alert-success">Pay Grade details updated successfully</div>}
            {isError && <div className="alert alert-danger">Pay Grade details failed to be updated</div>}
        </>
    )
}

export default GradeUpdate