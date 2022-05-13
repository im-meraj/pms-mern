import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    // console.log(user);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <header className="header">
            <div className="header__logo">
                <Link to="">Employee & Payroll Management System</Link>
            </div>
            <div className="header__nav">
                <ul className="header__nav-list">
                    {user ? (
                        <li className="header__nav-item">
                            <button className="btn" onClick={onLogout}><FaSignOutAlt /> Logout</button>
                        </li>
                    ) : (<>
                        <li className="header__nav-item">
                            <Link to="/" className="header__nav-link"><FaSignInAlt /> Login</Link>
                        </li>
                        {/* <li className="header__nav-item">
                            <Link to="/register" className="header__nav-link"><FaUser /> Register</Link>
                        </li> */}
                    </>)}
                </ul>
            </div>
        </header>
    )
}

export default Header