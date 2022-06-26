import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import { FaArrowLeft } from 'react-icons/fa';
import { getAllGrades, reset } from '../../features/grade/gradeSlice';
import GradeTableComponent from '../../components/GradeTableComponent';

const GradeTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, message } = useSelector((state) => state.grade);

    useEffect(() => {
        if (isError) {
            return console.log(message);
        }

        if (!user) {
            navigate('/');
        }

        dispatch(getAllGrades());
        dispatch(reset());

    }, [user, navigate, isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Link to="/admin"><FaArrowLeft /> Back to Dashboard</Link>
                    <div className="page__heading-gt">
                        <h1>Pay Grade<br />Details Table</h1>
                    </div>
                </div>

                <div className="gt__container">

                <div className="gt-img">
                        <img src="https://res.cloudinary.com/immeraj/image/upload/v1656279036/pms/undraw_Dashboard_re_3b76_poaekf.png" alt="" />
                </div>

                <GradeTableComponent />
                </div>

            </div>
        </>
    )
}

export default GradeTable