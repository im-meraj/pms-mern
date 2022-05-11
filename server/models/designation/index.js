import mongoose from "mongoose";

const DesignationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designationId: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

export const DesignationModel = mongoose.model("Designation", DesignationSchema);