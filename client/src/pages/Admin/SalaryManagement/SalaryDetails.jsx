import jsPDF from "jspdf";
import { useEffect } from "react";
import {FaArrowLeft} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import { getSpecificEmployee } from "../../../features/employee/employeeSlice";

const SalaryDetails = () => {
    const { id } = useParams();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const { salaries } = useSelector((state) => state.salary);
    const { employee, isLoading } = useSelector((state) => state.employee);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpecificEmployee(salaries[0].employeeId));
    }, [dispatch, salaries]);

    const generatePDF = () => {
        const doc = new jsPDF("landscape", "pt", "a4");
        doc.html(document.getElementById("payslip"), {
            callback: function (doc) {
                doc.save(`payslip.pdf`);
            },
        })

    }

    if (isLoading) {
        return <h1>Loading...</h1>
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
            <Link to={`/admin/displaySalary/${id}`}>
                <FaArrowLeft /> Back to Manage Salary
            </Link>
            <div className="page__heading">
                <h1>
                    Salary Details
                </h1>
            </div>
          </div>

        <div className="payslip__container" id="payslip">
              <div className="payslip__header">
                    <div className="payslip__header__left">
                        <div className="payslip__header__left__logo">
                            <h1>XYZ Co. Ltd</h1>
                        </div>
                    </div>
                    <div className="payslip__header__right">
                      <div className="payslip__header__right__address">
                          <h3>
                              123, ABC Street,
                              <br />
                              XYZ City,
                              <br />
                              XYZ Country
                          </h3>
                      </div>
                    </div>
              </div>

              <hr />

              <div className="payslip__date">
                  {
                        salaries.map((salary) => {
                            return (
                                <h2>{`Payslip for the Month of ${months[salary.month]} ${salary.year} `}</h2>
                            )
                        })
                  }
              </div>

              <hr />

              <div className="payslip__body">
                    <div className="payslip__body__top">
                        <div className="payslip__body__left__employee">
                            <h3>{`Personal No. : ${employee && employee[0].personalNo}`}</h3>
                          <h3>{`Emp. Name : ${employee && employee[0].fullname}`}</h3>
                        </div>
                        <div className="payslip__body__right__employee">
                            <h3>{`Paid Days: ${salaries[0].attendedDays + salaries[0].offDays}`}</h3>
                            <h3>{`LOP Days: ${salaries[0].lwpDays}`}</h3>
                        </div>
                    </div>
              </div>
        </div>
        <button onClick={generatePDF} className="btn btn-primary">Generate PDF</button>
    </>
  )
}

export default SalaryDetails