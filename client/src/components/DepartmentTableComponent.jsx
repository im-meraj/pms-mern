import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteDepartment, getDepartments } from "../features/department/departmentSlice";
import { Link } from "react-router-dom";

const DepartmentTableComponent = () => {
    const { departments } = useSelector((state) => state.department);
    const dispatch = useDispatch();

    return (
        <>
            <div className="table__container">
                {departments.length > 0 ? (
                    <table className="table" cellPadding={5} cellSpacing={30}>
                        <thead>
                            <tr>
                                <th>Dept ID</th>
                                <th>Department Name</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department, index) => (
                                <tr key={index}>
                                    <td>{department.deptId}</td>
                                    <td>{department.name}</td>
                                    <td>
                                        <Link to={`/admin/editDepartment/${department._id}`}>
                                        <button className="btn-secondary btn-edit" style={{ fontSize: '12px' }} ><FiEdit /></button>
                                        </Link>
                                        <button className="btn-danger btn-delete" style={{ fontSize: '12px' }} onClick={() => {
                                            if (window.confirm(`Are you sure you want to delete ${department.name} department?`)) {
                                                dispatch(deleteDepartment(department._id));
                                                dispatch(getDepartments());
                                            }
                                        }}><RiDeleteBin6Line /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (<h3>No Departments</h3>)}
            </div>
        </>
    )
}

export default DepartmentTableComponent