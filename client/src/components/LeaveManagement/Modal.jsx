import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSpecificLeaveApplication } from "../../features/leave/leaveSlice";

const Modal = ({ open, onClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { leaveApplication } = useSelector((state) => state.leave);

  useEffect(() => {
      dispatch(getSpecificLeaveApplication(id));
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    LeaveType: "",
    FromDate: new Date(),
    ToDate: new Date(),
    Reason: "",
    Status: "Pending",
    employee: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  if (!open) return null;

  return (
    <Link to="/admin/manageLeaveApplications">
      <div className="overlay" onClick={onClose}>
        <div
          className="modal__container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="modal__content">
            <h1>Manage</h1>
            <section className="form">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="LeaveType">Leave Type</label>
                  <select
                    className="form-control"
                    id="LeaveType"
                    name="LeaveType"
                    onChange={onChange}
                    disabled={true}
                  >
                    <option value="">{leaveApplication[0].LeaveType}</option>
                    <option value="Casual">Casual</option>
                    <option value="Sick">Sick</option>
                    <option value="Earned">Earned</option>
                    <option value="Loss">Loss</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="FromDate">From Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="FromDate"
                    name="FromDate"
                    onChange={onChange}
                    disabled={true}
                    placeholder={new Date(
                      leaveApplication[0].FromDate
                    ).toLocaleDateString()}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ToDate">To Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ToDate"
                    name="ToDate"
                    onChange={onChange}
                    disabled={true}
                    placeholder={new Date(
                      leaveApplication[0].ToDate
                    ).toLocaleDateString()}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="TotalDays">Total Days</label>
                  <input
                    type="text"
                    className="form-control"
                    id="TotalDays"
                    name="TotalDays"
                    disabled={true}
                    placeholder={leaveApplication[0].TotalDays}
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
                    disabled={true}
                    placeholder={leaveApplication[0].Reason}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Status">Status</label>
                  <select
                    className="form-control"
                    id="Status"
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
        </div>
      </div>
    </Link>
  );
};

export default Modal;
