import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { addGrade, getAllGrades, reset } from "../../features/grade/gradeSlice";

const Grade = () => {
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
        }

        dispatch(addGrade(gradeData));
        dispatch(getAllGrades());

    }


    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Link to="/admin"><FaArrowLeft /> Back to Dashboard</Link>
                <div className="page__heading" >
                    <h1>Add New<br />Pay Grade</h1>
                </div>
            </div>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="gradeId">Grade ID</label>
                        <input type="text" className="form-control" id="gradeId" name="gradeId" placeholder="Enter Grade ID" onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gradeName">Name of the Grade</label>
                        <input type="text" className="form-control" id="gradeName" name="gradeName" placeholder="Enter Grade Name" onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="basic">Basic Salary</label>
                        <input type="number" className="form-control" id="basic" name="basic" placeholder="Enter Basic salary" onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
            {isSuccess && <div className="alert alert-success">Pay Grade added successfully</div>}
            {isError && <div className="alert alert-danger">Failed to add Pay Grade</div>}
        </>
    )
}

export default Grade