import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteDesignation, getDesignations } from "../features/designation/designationSlice";
import { Link } from "react-router-dom";

const DesignationTableComponent = () => {
    const { designations } = useSelector((state) => state.designation);
    const dispatch = useDispatch();

    return (
        <>
            <div className="table__container">
                {designations.length > 0 ? (
                    <table className="table" cellPadding={5} cellSpacing={30}>
                        <thead>
                            <tr>
                                <th>Designation ID</th>
                                <th>Designation Name</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {designations.map((designation, index) => (
                                <tr key={index}>
                                    <td>{designation.designationId}</td>
                                    <td>{designation.name}</td>
                                    <td>
                                        <Link to={`/admin/editDesignation/${designation._id}`}>
                                        <button className="btn-secondary btn-edit" style={{ fontSize: '12px' }}><FiEdit /></button>
                                        </Link>
                                        <button className="btn-danger btn-delete" style={{ fontSize: '12px' }} onClick={() => {
                                            dispatch(deleteDesignation(designation._id));
                                            dispatch(getDesignations());
                                        }}><RiDeleteBin6Line /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (<h3>No Designations</h3>)}
            </div>
        </>
    )
}

export default DesignationTableComponent