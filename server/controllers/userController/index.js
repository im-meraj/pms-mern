import { UserModel } from '../../models/allModels';

// • bcrypt
import bcrypt from 'bcrypt';

/**
Route:      /employee:id
Method:     GET
Access:     Private
Description: Get a particular employee
Params:     id
**/
const getEmployee = async (req, res) => {
    try {
        const employee = await UserModel.findById(req.params.id).populate(["department", "designation", "grade"]).select("-password");
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }
        
        return res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json({
            message: 'Error getting employee',
            error
        });
    }
}

/**
Route:      /employee:personalNo
Method:     GET
Access:     Private
Description: Get a particular employee using personal no
Params:     personalNo
**/
const getEmployeeByPersonalNo = async (req, res) => {
    try {
        const personalNo = req.params.pno;
        console.log(personalNo);
        const employee = await UserModel.findOne({ personalNo });
        return res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json({
            message: 'Error getting employee',
            error
        });
    }
}


/**
Route:      /employee
Method:     GET
Access:     Private
Description: Get all employees
Params:     none
**/
const getAllEmployees = async (req, res) => {
    try {
        const employees = await UserModel.find().populate(["department", "designation", "grade"]).select("-password");
        return res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json({
            message: 'Error getting employees',
            error
        });
    }
}

/**
Route:      /employee
Method:     POST
Access:     Private
Description: Add a new employee
Params:     none
**/
const setEmployee = async (req, res) => {
    try {
        const employeeDetails = req.body;
        console.log(employeeDetails);

        if (!req.body) {
            return res.status(400).json({
                message: 'Details are required',
            });
        }

        const employee = await UserModel.create(employeeDetails);
        return res.status(201).json(employee);

    } catch (error) {
        return res.status(500).json({
            message: 'Error adding employee',
            error
        });
    }
}

/**
Route:      /employee:id
Method:     PUT
Access:     Private
Description: Update an employee details
Params:     id
**/
const updateEmployee = async (req, res) => {
    try {
        const employee = await UserModel.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found',
            });
        }

        const { password } = req.body;

        //hash password
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updatedEmployee = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: {
                ...req.body,
                password: hashedPassword
            }
        }, {
            new: true,
        });

        return res.status(200).json({
            ...updatedEmployee._doc,
            password: null
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating employee',
            error: error
        });
    }

}

/**
Route:      /employee:id
Method:     DELETE
Access:     Private
Description: Delete an employee
Params:     id
**/
const deleteEmployee = async (req, res) => {
    const employee = await UserModel.findById(req.params.id);
    if (!employee) {
        return res.status(404).json({
            message: 'Employee not found',
        });
    }
    await employee.remove();
    return res.status(200).json({
        message: 'Employee deleted successfully',
    });
}

export {
    getEmployee,
    getAllEmployees,
    getEmployeeByPersonalNo,
    setEmployee,
    updateEmployee,
    deleteEmployee
}