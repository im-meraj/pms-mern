import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import EmployeeTableComponent from '../../components/EmployeeTableComponent';
import { getEmployees } from '../../features/employee/employeeSlice';
import { FaArrowLeft } from 'react-icons/fa';

const EmployeesTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, message } = useSelector((state) => state.employee);

    useEffect(() => {
        if (isError) {
            return console.log(message);
        }

        if (!user) {
            navigate('/');
        }

        dispatch(getEmployees());

    }, [user, navigate, isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Link to="/admin"><FaArrowLeft /> Back to Dashboard</Link>
                    <div className="page__heading-c">
                        <h1>Employees<br />Details Table</h1>
                    </div>
                </div>

                <div className="showEmp__container">

                <div className="se-img">
                        <img src="https://res.cloudinary.com/immeraj/image/upload/v1656279037/pms/undraw_Personal_data_re_ihde_qu1gj2.png" alt="" />
                </div>

                <EmployeeTableComponent />
                </div>
            </div>
        </>
    )
}

export default EmployeesTable