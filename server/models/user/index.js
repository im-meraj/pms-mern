import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    personalNo: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    dob: { type: Date },
    address: { type: String, default: "Unavailable" },
    phone: { type: Number, default: 0 },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    designation: { type: mongoose.Schema.Types.ObjectId, ref: "Designation" },
    grade: { type: mongoose.Schema.Types.ObjectId, ref: "Grade" },
    salary: [{ type: mongoose.Schema.Types.ObjectId, ref: "Salary" }],
    leaveApplication: [{ type: mongoose.Schema.Types.ObjectId, ref: "LeaveApplication" }],
    role: { type: String, enum: ["admin", "employee"], default: "employee" }
}, {
    timestamps: true
});

export const UserModel = mongoose.model("User", UserSchema);