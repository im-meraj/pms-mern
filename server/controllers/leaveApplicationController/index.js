import { LeaveApplicationModel } from "../../models/allModels";
import mongoose from "mongoose";

/**
Route:      /leaveApplicationEmployee/one:id
Method:     GET
Access:     Private
Description: Get specific leave application for an employee
Params:     id
**/
const getSpecificLeaveApplication = async (req, res) => {
    try {
        const leaveApplications = await LeaveApplicationModel.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $addFields: {
                    TotalDays: {
                        $dateDiff: {
                            startDate: "$FromDate",
                            endDate: "$ToDate",
                            unit: "day"
                        }
                    }
                }
            },
        ]);
        return res.status(200).json(leaveApplications);
    } catch (error) {
        return res.status(500).json({
            message: 'Error getting leave applications',
            error
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
const getAllLeaveApplications = async (req, res) => {
    try {
        // const leaveApplications = await LeaveApplicationModel.find().populate();
        const leaveApplications = await LeaveApplicationModel.aggregate([
          {
            $match: {},
          },
          {
            $addFields: {
              TotalDays: {
                $dateDiff: {
                  startDate: "$FromDate",
                  endDate: "$ToDate",
                  unit: "day",
                },
              },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "employee",
              foreignField: "_id",
              as: "employee",
            },
          },
          {
            $unwind: {
              path: "$employee",
            },
          },
          {
            $project: {
              LeaveType: 1,
              FromDate: 1,
              ToDate: 1,
              Reason: 1,
              Status: 1,
              TotalDays: 1,
              employee: {
                fullname: 1,
                _id: 1,
              },
            },
          },
        ]);
        return res.status(200).json(leaveApplications);
    } catch (error) {
        return res.status(500).json({
            message: 'Error getting leave applications',
            error
        });
    }
}


/**
Route:      /leaveApplicationEmployee:id
Method:     GET
Access:     Private
Description: Get all leave applications for an employee
Params:     id
**/
const getLeaveApplications = async (req, res) => {
    try {
        // const leaveApplications = await LeaveApplicationModel.find({ employee: req.params.id }).populate();
        const leaveApplications = await LeaveApplicationModel.aggregate([
            {
                $match: {
                    employee: mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $addFields: {
                    TotalDays: {
                        $dateDiff: {
                            startDate: "$FromDate",
                            endDate: "$ToDate",
                            unit: "day"
                        }
                    }
                }
            },
        ]);

        return res.status(200).json(leaveApplications);
    } catch (error) {
        return res.status(500).json({
            message: 'Error getting leave applications',
            error
        });
    }
}

    
/**
Route:      /leaveApplicationEmployee:id
Method:     POST
Access:     Private
Description: Add a leave application for an employee
Params:     id
**/
const setLeaveApplication = async (req, res) => {
    try {
        const leaveApplicationDetails = req.body;
        console.log(leaveApplicationDetails);

        // const newLeaveApplication = {
        //     ...leaveApplicationDetails,
        //     employee: req.params.id
        // }

        if (!req.body) {
            return res.status(400).json({
                message: 'Details are required',
            });
        }

        const leaveApplication = await LeaveApplicationModel.create(leaveApplicationDetails);
        return res.status(201).json(leaveApplication);

    } catch (error) {
        return res.status(500).json({
            message: 'Error adding leave application',
            error
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
const updateLeaveApplicationStatus = async (req, res) => {
    try {
        const leaveApplication = await LeaveApplicationModel.findByIdAndUpdate(req.params.id, {
            Status: req.body.Status
        }, { new: true });
        return res.status(200).json(leaveApplication);
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating leave application',
            error
        });
    }
}

// /**
// Route:      /department:id
// Method:     DELETE
// Access:     Private
// Description: Delete an department
// Params:     id
// **/
// const deleteDepartment = async (req, res) => {
//     const department = await DepartmentModel.findById(req.params.id);
//     if (!department) {
//         return res.status(404).json({
//             message: 'Department not found',
//         });
//     }
//     await department.remove();
//     return res.status(200).json({
//         message: 'Department deleted successfully',
//     });
// }

export {
    getLeaveApplications,
    setLeaveApplication,
    getAllLeaveApplications,
    getSpecificLeaveApplication,
    updateLeaveApplicationStatus
}