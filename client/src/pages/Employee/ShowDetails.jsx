import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getSpecificEmployee } from "../../features/employee/employeeSlice";
import Spinner from "../../components/Spinner";


const ShowDetails = () => {
    const [employeeDetails, setEmployeeDetails] = useState(null);
    const { employee, isLoading } = useSelector((state) => state.employee);

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpecificEmployee(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (employee) {
            setEmployeeDetails(employee[0]);
        }
    }, [employee]);

    console.log(employeeDetails);

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
                  justifyContent: "center",
              }}
          >
              <Link to="/dashboard">
                  <FaArrowLeft /> Back to Dashboard
              </Link>
              <div className="page__heading">
                  <h1>
                      Personal Details
                  </h1>
              </div>
          </div>

          <div className="table__container">
              <table className="table" cellPadding={5} cellSpacing={30}>
                  <thead>
                      <tr>
                          <th>Personal No.</th>
                          <td>{employeeDetails && employeeDetails.personalNo}</td>
                      </tr>
                      <tr>
                            <th>Name</th>
                            <td>{employeeDetails && employeeDetails.fullname}</td>
                      </tr>
                      <tr>
                            <th>Email</th>
                            <td>{employeeDetails && employeeDetails.email}</td>
                      </tr>
                      <tr>
                            <th>Phone</th>
                            <td>{employeeDetails && employeeDetails.phone}</td>
                      </tr>
                      <tr>
                            <th>Address</th>
                            <td>{employeeDetails && employeeDetails.address}</td>
                      </tr>
                        <tr>
                            <th>Date of Birth</th>
                            <td>{employeeDetails && new Date(employeeDetails.dob).toLocaleDateString()}</td>
                        </tr>
                  </thead>
                  <tbody>
                      
                  </tbody>
              </table>
          </div>
    </>
  )
}

export default ShowDetails