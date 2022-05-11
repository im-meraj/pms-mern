import mongoose from "mongoose";

const LeaveApplicationSchema = new mongoose.Schema({
    LeaveType: { type: String, required: true },
    FromDate: { type: Date, required: true },
    ToDate: { type: Date, required: true },
    Reason: { type: String, required: true },
    Status: { type: String, required: true },
    employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }]
}, {
    timestamps: true
});

export const LeaveApplicationModel = mongoose.model("LeaveApplication", LeaveApplicationSchema);