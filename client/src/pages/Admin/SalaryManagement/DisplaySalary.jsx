import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSalariesByMonthAndYear } from '../../../features/salary/salarySlice';
import { useState } from 'react';
import { getSpecificEmployee } from '../../../features/employee/employeeSlice';

const DisplaySalary = () => {
    const { salaries } = useSelector((state) => state.salary);
    const { id } = useParams();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
    const [formData, setFormData] = useState({
        month: 0,
        year: 0,
    });

    const { month, year } = formData;
    
    const dispatch = useDispatch();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: Number(e.target.value),
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const params = {
            month,
            year,
        }
        dispatch(getAllSalariesByMonthAndYear({id, params}));
    }

    const onClick = () => {
        dispatch(getSpecificEmployee(id));
    }
    
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Link to="/admin/manageSalary">
                    <FaArrowLeft /> Back to Manage Salary
                </Link>
                <div className="page__heading">
                    <h1>
                        List of
                        <br />
                        Previously paid salaries
                    </h1>
                </div>
            </div>

            <div className="modal__container">
                <section className="form">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="month">Select Month</label>
                            <select className="form-control" id="month" name="month" onChange={onChange}>
                                <option value="">Select Month</option>
                                {months.map((month, index) => (
                                    <option key={index} value={index}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="year">Select Year</label>
                            <select className="form-control" id="year" name="year" onChange={onChange}>
                                <option value="">Select Year</option>
                                {years.map((year, index) => (
                                    <option key={index} value={Number(year)}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Search</button>
                        </div>
                    </form>
                </section>
            </div>

            <div className="table__container">
                <table className="table" cellPadding={5} cellSpacing={30}>
                    <thead>
                        <tr>
                            <th>Personal No.</th>
                            <th>Basic</th>
                            <th>DA</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Amount Paid</th>
                            <th>View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salaries.map((salary, index) => (
                            <tr key={index}>
                                <td>{salary.personalNo}</td>
                                <td>{salary.basicSalary}</td>
                                <td>{salary.da}</td>
                                <td>{months[salary.month]}</td>
                                <td>{salary.year}</td>
                                <td>{salary.netSalary}</td>
                                <td>
                                    <Link to={`/admin/manageSalary/salaryDetails/${salary._id}`} >
                                        <button className="btn btn-primary" onClick={onClick}>View</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DisplaySalary