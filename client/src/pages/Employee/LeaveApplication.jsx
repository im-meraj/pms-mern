import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { addLeaveApplication, getLeaveApplications, reset } from '../../features/leave/leaveSlice';

const LeaveApplication = () => {
    const { user } = useSelector((state) => state.auth);
    const { leaveApplications } = useSelector((state) => state.leave);

    const [formData, setFormData] = useState({
        LeaveType: "",
        FromDate: new Date(),
        ToDate: new Date(),
        Reason: "",
        Status: "Pending",
        employee: "",
    });

    const { LeaveType, FromDate, ToDate, Reason, Status } = formData;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLeaveApplications());
        return () => {
            dispatch(reset());
        }
    }, [dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const leaveApplicationData = {
            LeaveType,
            FromDate,
            ToDate,
            Reason,
            Status,
            employee: user._id,
        }

        dispatch(addLeaveApplication(leaveApplicationData));
        dispatch(reset());

        setFormData({
            LeaveType: "",
            FromDate: new Date(),
            ToDate: new Date(),
            Reason: "",
            Status: "Pending",
            employee: "",
        }
        );

        dispatch(getLeaveApplications());

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
          <Link to="/dashboard">
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <div className="page__heading">
            <h1>
              Add New
              <br />
              Leave Application
            </h1>
          </div>
        </div>

        <div className="modal__container">
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="LeaveType">Leave Type</label>
              <select
                className="form-control"
                id="LeaveType"
                name="LeaveType"
                onChange={onChange}
              >
                <option value="">Select Leave Type</option>
                <option value="Casual">Casual</option>
                <option value="Sick">Sick</option>
                <option value="Earned">Earned</option>
                <option value="Loss">Loss</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="FromDate">From Date</label>
              <input
                type="date"
                className="form-control"
                id="FromDate"
                name="FromDate"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="ToDate">To Date</label>
              <input
                type="date"
                className="form-control"
                id="ToDate"
                name="ToDate"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Reason">Reason</label>
              <textarea
                className="form-control"
                id="Reason"
                name="Reason"
                rows="3"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Status">Status</label>
              <select
                className="form-control"
                id="Status"
                disabled
                name="Status"
                onChange={onChange}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            </div>
          </form>
        </section>
        </div>

        <div className="table__container">
          {leaveApplications.length > 0 ? (
            <table className="table" cellPadding={5} cellSpacing={30}>
              <thead>
                <tr>
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
                {leaveApplications
                  .map((leave, index) => (
                    <tr key={index}>
                      <td>{leave.LeaveType}</td>
                      <td>{new Date(leave.FromDate).toLocaleDateString()}</td>
                      <td>{new Date(leave.ToDate).toLocaleDateString()}</td>
                      <td>{leave.TotalDays + 1}</td>
                      <td>{leave.Reason}</td>
                      <td
                        className={`status${
                          leave.Status === "Pending" ? " pending" : ""
                        }${leave.Status === "Approved" ? " approved" : ""}${
                          leave.Status === "Rejected" ? " rejected" : ""
                        }`}
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
                        {/* <button
                          className="btn-secondary btn-edit"
                          style={{ fontSize: "12px" }}
                        >
                          <FiEdit />
                        </button> */}
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
      </>
    );
}

export default LeaveApplication