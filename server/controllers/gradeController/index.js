import { GradeModel } from "../../models/allModels";

/**
Route:      /grade
Method:     GET
Access:     Private
Description: Get all pay grades
Params:     none
**/
const getAllPayGrades = async (req, res) => {
    try {
        const Grades = await GradeModel.find();
        return res.status(200).json(Grades);
    } catch (error) {
        return res.status(500).json({
            message: 'Error getting pay grades!',
            error
        });
    }
}

/**
Route:      /grade
Method:     POST
Access:     Private
Description: Add a new pay grade
Params:     none
**/
const setGrade = async (req, res) => {
    try {
        const gradeDetails = req.body;
        console.log(gradeDetails);

        if (!req.body) {
            return res.status(400).json({
                message: 'Details are required',
            });
        }

        const grade = await GradeModel.create(gradeDetails);
        return res.status(201).json(grade);

    } catch (error) {
        return res.status(500).json({
            message: 'Error adding pay grade!',
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
// const updateDesignation = async (req, res) => {
//     try {
//         const designation = await DesignationModel.findById(req.params.id);
//         if (!designation) {
//             return res.status(404).json({
//                 message: 'Designation not found',
//             });
//         }
//         const updatedDesignation = await DesignationModel.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//         });
//         return res.status(200).json(updatedDesignation);
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Error updating designation',
//             error
//         });
//     }

// }

/**
Route:      /designation:id
Method:     DELETE
Access:     Private
Description: Delete a designation
Params:     id
**/
// const deleteDesignation = async (req, res) => {
//     const designation = await DesignationModel.findById(req.params.id);
//     if (!designation) {
//         return res.status(404).json({
//             message: 'Designation not found',
//         });
//     }
//     await designation.remove();
//     return res.status(200).json({
//         message: 'Designation deleted successfully',
//     });
// }

export {
    getAllPayGrades,
    setGrade,
}