import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import { FaArrowLeft } from 'react-icons/fa';
import { getDepartments } from '../../features/department/departmentSlice';
import DepartmentTableComponent from '../../components/DepartmentTableComponent';

const DepartmentTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, message } = useSelector((state) => state.department);

    useEffect(() => {
        if (isError) {
            return console.log(message);
        }

        if (!user) {
            navigate('/');
        }

        dispatch(getDepartments());

    }, [user, navigate, isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Link to="/admin"><FaArrowLeft /> Back to Dashboard</Link>
                    <div className="page__heading-ddt">
                        <h1>Department<br />Details Table</h1>
                    </div>
                </div>
                <DepartmentTableComponent />
            </div>
        </>
    )
}

export default DepartmentTable