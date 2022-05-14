import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Modal from '../../../components/LeaveManagement/Modal';
import Spinner from '../../../components/Spinner';
import { getAllLeaveApplications, getSpecificLeaveApplication } from '../../../features/leave/leaveSlice';

const ManageLeave = () => {
    const [openModal, setOpenModal] = useState(false);



    // const { user } = useSelector((state) => state.auth);
    const { allLeaveApplications, isLoading } = useSelector((state) => state.leave);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllLeaveApplications());
    }, [dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Link to="/admin">
          <FaArrowLeft /> Back to Dashboard
        </Link>
        <div className="page__heading">
          <h1>
            Manage
            <br />
            Leave Applications
          </h1>
        </div>
      </div>
      <div className="table__container">
        {allLeaveApplications.length > 0 ? (
          <table className="table" cellPadding={5} cellSpacing={30}>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Total Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {allLeaveApplications
                .map((leave, index) => (
                  <tr key={index}>
                    <td>{leave.employee._id}</td>
                    <td>{leave.employee.fullname}</td>
                    <td>{leave.LeaveType}</td>
                    <td>{new Date(leave.FromDate).toLocaleDateString()}</td>
                    <td>{new Date(leave.ToDate).toLocaleDateString()}</td>
                    <td>{leave.TotalDays + 1}</td>
                    <td>{leave.Reason}</td>
                    <td
                      className={`status${
                        leave.Status === "Pending" ? " pending" : ""
                      }${leave.Status === "Approved" ? " approved" : ""}`}
                    >
                      <span
                        className={`status__circle ${
                          leave.Status === "Pending" ? "pending" : ""
                        }${leave.Status === "Approved" ? " approved" : ""}${
                          leave.Status === "Rejected" ? " rejected" : ""
                        }`}
                      >
                        {leave.Status}
                      </span>
                    </td>
                    <td>
                      <Link to={`/admin/editLeaveStatus/${leave._id}`}>
                        <button
                          className="btn-secondary btn-edit"
                          style={{ fontSize: "12px" }}
                          onClick={() => {
                            dispatch(getSpecificLeaveApplication(leave._id));
                          }}
                        >
                          <FiEdit />
                        </button>
                      </Link>
                      <button
                        className="btn-danger btn-delete"
                        style={{ fontSize: "12px" }}
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                ))
                .reverse()}
            </tbody>
          </table>
        ) : (
          <h3>No Leave Applications</h3>
        )}
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default ManageLeave