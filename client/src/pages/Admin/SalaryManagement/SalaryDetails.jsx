import jsPDF from "jspdf";
import { useEffect } from "react";
import {FaArrowLeft} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import Spinner from "../../../components/Spinner";
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

    // const calculateNetAmount = () => {
    //     const tax = 0.15;
    //     const gross = salaries && salaries[0].netSalary;
    //     const net = gross - (gross * tax);
    //     return Number(net);
    // }

    // const netAmount = calculateNetAmount();
    
    const calculateProvidentFunds = () => {
        const providentFunds = 0.02;
        const gross = salaries[0].basicSalary + salaries[0].da;
        const providentFundsAmount = gross * providentFunds;
        return Number(providentFundsAmount.toFixed(3));
    }

    const providentFund = calculateProvidentFunds();

    const calculateTaxAmount = () => {
        const tax = 0.05;
        const gross = salaries[0].basicSalary + salaries[0].da;
        const taxAmount = gross * tax;
        return Number(taxAmount.toFixed(2));
    }

    const taxAmount = calculateTaxAmount();

    const calculateTotalDeductions = () => {
        const totalDeductions = providentFund + taxAmount;
        return Number(totalDeductions.toFixed(2));
    }

    const totalDeduction = calculateTotalDeductions();

    const calculateNetSalary = (td) => {
        const netSalary = salaries[0].netSalary;
        const netAmount = netSalary - td;
        return Number(netAmount.toFixed(2));
    }

    const netSalary = calculateNetSalary(totalDeduction);


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
            <Link to={`/admin/displaySalary/${id}`}>
                <FaArrowLeft /> Back to Manage Salary
            </Link>
            <div className="page__heading">
                <h1>
                    Salary Details & <br />
                    Payslip Generation
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
                        salaries.map((salary, index) => {
                            return (
                                <h2 key={index}>{`Payslip for the Month of ${months[salary.month]} ${salary.year} `}</h2>
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
                            <h3>{`Paid Days: ${salaries && salaries[0].attendedDays + salaries[0].offDays}`}</h3>
                            <h3>{`LOP Days: ${salaries && salaries[0].lwpDays}`}</h3>
                        </div>
                    </div>

                    <hr />

                    <div className="payslip__body__bottom">
                        <div className="payslip__body__left">
                            <h3>{`Basic Salary: ${salaries && salaries[0].basicSalary}`}</h3>
                            <h3>{`DA: ${salaries && salaries[0].da}`}</h3>
                            <h3 style={{borderTop: '1px solid black'}}>{`Gross Earning: ${salaries && salaries[0].basicSalary + salaries[0].da}`}</h3>
                        </div>

                        <div className="payslip__body__right">
                            <h3>{`Income Tax: ${taxAmount}`}</h3>
                            <h3>{`Provident Fund: ${providentFund}`}</h3>
                            <h3 style={{ borderTop: '1px solid black' }}>{`Gross Deduction: ${totalDeduction}`}</h3>
                            <h3 style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>{`Net Salary: ${netSalary}`}</h3>
                        </div>
                    </div>

              </div>
        </div>
        <button onClick={generatePDF} className="btn btn-primary">Generate Payslip</button>
    </>
  )
}

export default SalaryDetails