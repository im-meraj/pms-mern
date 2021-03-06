import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getSpecificLeaveApplication, reset, updateLeaveApplicationStatus } from "../../../features/leave/leaveSlice";
import Spinner from "../../../components/Spinner";

const EditLeaveStatus = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   console.log(id);

  const { leaveApplication, isError, isLoading } = useSelector((state) => state.leave);

  useEffect(() => {
      if (isError) {
        alert(isError);
        }
        else {
    dispatch(getSpecificLeaveApplication(id));
        }
        return () => {
            dispatch(reset());
        }
  },[dispatch, id, isError]);

  const [formData, setFormData] = useState({
    _id: id,
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
    dispatch(updateLeaveApplicationStatus(formData));
    navigate("/admin/manageLeaveApplications");
  };

  if(isLoading) {
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
        <Link to="/admin/manageLeaveApplications">
          <FaArrowLeft /> Back to Leave Applications
        </Link>
        <div className="page__heading">
          <h1>
            Update Status of <br />
            Leave Application
          </h1>
        </div>
      </div>

      <div className="lau__container">

      <div className="la-img">
          <img src="https://res.cloudinary.com/immeraj/image/upload/v1656279037/pms/undraw_Preferences_re_49in_ul5hyg.png" alt="" />
      </div>

      {leaveApplication && (
        <div className="modal__container">
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
                    <option value="">{leaveApplication[0] && leaveApplication[0].LeaveType}</option>
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
                    placeholder={leaveApplication[0].TotalDays + 1}
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
                  <label htmlFor="Status">Change Leave Application Status</label>
                  <select
                    className="form-control"
                    id="Status"
                    name="Status"
                    onChange={onChange}
                    focus={true}
                  >
                    <option value="">
                      Current Status: {leaveApplication[0].Status}
                    </option>
                    <option value="Approved">Approve</option>
                    <option value="Rejected">Reject</option>
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
      )}
      </div>
    </>
  );
};

export default EditLeaveStatus;
