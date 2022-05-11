import { UserModel } from '../../models/allModels';

/**
Route:      /employee:id
Method:     GET
Access:     Private
Description: Get a particular employee
Params:     id
**/
const getEmployee = async (req, res) => {
    try {
        const employee = await UserModel.findById(req.params.id);
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
        const employees = await UserModel.find().populate();
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
        const updatedEmployee = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true,
        });
        return res.status(200).json(updatedEmployee);
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating employee',
            error
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
    setEmployee,
    updateEmployee,
    deleteEmployee
}