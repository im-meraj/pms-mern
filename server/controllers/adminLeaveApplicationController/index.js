import { LeaveApplicationModel } from "../../models/allModels";

/**
Route:      /leaveApplicationAdmin
Method:     GET
Access:     Private
Description: Get all leave applications
Params:     none
**/
const getAllLeaveApplications = async (req, res) => {
    try {
        const leaveApplications = await LeaveApplicationModel.find().populate();
        return res.status(200).json(leaveApplications);
    } catch (error) {
        return res.status(500).json({
            message: 'Error getting leave applications',
            error
        });
    }
}

export {
    getAllLeaveApplications
}