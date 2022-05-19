import { SalaryModel } from "../../models/allModels";
import mongoose from "mongoose";

/**
Route:      /salary:id/?month=:month&year=:year
Method:     GET
Access:     Private
Description: Get all salaries according to the specified month and year.
Params:     id
**/
const getAllSalariesByMonthAndYear = async (req, res) => {
    try {
        const { month, year } = req.query;
        const salaries = await SalaryModel.find({ month, year });
        return res.status(200).json(salaries);
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "Error while getting salaries by month and year."
        });
    }
}


/**
Route:      /leaveApplicationEmployee
Method:     GET
Access:     Private
Description: Get all leave applications
Params:     none
**/



/**
Route:      /leaveApplicationEmployee:id
Method:     GET
Access:     Private
Description: Get all leave applications for an employee
Params:     id
**/



/**
Route:      /salary:id
Method:     POST
Access:     Private
Description: Add salary payment details for an employee
Params:     id
**/
const addSalary = async (req, res) => {
    try {
        const { employeeId, gradeId, gradeName, basicSalary, da, attendedDays, offDays, lwpDays, netSalary, month, year, personalNo } = req.body;
        const salary = new SalaryModel({ employeeId, gradeId, gradeName, basicSalary, da, attendedDays, offDays, lwpDays, netSalary, month, year, personalNo});
        const newSalary = await salary.save();
        return res.status(200).json(newSalary);
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "Error while adding salary."
        });
    }
}


/**
Route:      /leaveApplication/one:id
Method:     PUT
Access:     Private
Description: Update a leave application status
Params:     id
**/


// /**
// Route:      /department:id
// Method:     DELETE
// Access:     Private
// Description: Delete an department
// Params:     id
// **/


export {
    getAllSalariesByMonthAndYear,
    addSalary
}