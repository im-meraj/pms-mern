import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    attendedDays: { type: Number, required: true },
    offDays: { type: Number, required: true },
    lwp: { type: Number, required: true },
    employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }]
}, {
    timestamps: true
});

export const AttendanceModel = mongoose.model("Attendance", AttendanceSchema);