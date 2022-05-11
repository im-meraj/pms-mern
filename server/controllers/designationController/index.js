import { DesignationModel } from "../../models/allModels";

/**
Route:      /designation
Method:     GET
Access:     Private
Description: Get all designations
Params:     none
**/
const getDesignations = async (req, res) => {
    try {
        const designation = await DesignationModel.find();
        return res.status(200).json(designation);
    } catch (error) {
        return res.status(500).json({
            message: 'Error getting designations',
            error
        });
    }
}

/**
Route:      /designation
Method:     POST
Access:     Private
Description: Add a new Designation
Params:     none
**/
const setDesignation = async (req, res) => {
    try {
        const designationDetails = req.body;
        console.log(designationDetails);

        if (!req.body) {
            return res.status(400).json({
                message: 'Details are required',
            });
        }

        const designation = await DesignationModel.create(designationDetails);
        return res.status(201).json(designation);

    } catch (error) {
        return res.status(500).json({
            message: 'Error adding designation',
            error
        });
    }
}

/**
Route:      /designation:id
Method:     PUT
Access:     Private
Description: Update a designation details
Params:     id
**/
const updateDesignation = async (req, res) => {
    try {
        const designation = await DesignationModel.findById(req.params.id);
        if (!designation) {
            return res.status(404).json({
                message: 'Designation not found',
            });
        }
        const updatedDesignation = await DesignationModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return res.status(200).json(updatedDesignation);
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating designation',
            error
        });
    }

}

/**
Route:      /designation:id
Method:     DELETE
Access:     Private
Description: Delete a designation
Params:     id
**/
const deleteDesignation = async (req, res) => {
    const designation = await DesignationModel.findById(req.params.id);
    if (!designation) {
        return res.status(404).json({
            message: 'Designation not found',
        });
    }
    await designation.remove();
    return res.status(200).json({
        message: 'Designation deleted successfully',
    });
}

export {
    getDesignations,
    setDesignation,
    updateDesignation,
    deleteDesignation
}