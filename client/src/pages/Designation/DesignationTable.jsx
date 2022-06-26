import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import { FaArrowLeft } from 'react-icons/fa';
import { getDesignations, reset } from '../../features/designation/designationSlice';
import DesignationTableComponent from '../../components/DesignationTableComponent';

const DesignationTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, message } = useSelector((state) => state.designation);

    useEffect(() => {
        if (isError) {
            return console.log(message);
        }

        if (!user) {
            navigate('/');
        }

        dispatch(getDesignations());
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
                    <div className="page__heading-dest">
                        <h1>Designation<br />Details Table</h1>
                    </div>
                </div>
                <DesignationTableComponent />
            </div>
        </>
    )
}

export default DesignationTable