import mongoose from "mongoose";

const SalarySchema = new mongoose.Schema({
    gradeId: { type: mongoose.Schema.Types.ObjectId, ref: "Grade" },
    gradeName: { type: String, required: true },
    basicSalary: { type: Number, required: true },
    da: { type: Number, required: true },
    attendedDays: { type: Number, required: true },
    offDays: { type: Number, required: true },
    lwpDays: { type: Number, required: true },
    netSalary: { type: Number, required: true },
    month: { type: Number },
    year: { type: Number },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    personalNo: { type: String, required: true },
}, {
    timestamps: true
});

export const SalaryModel = mongoose.model("Salary", SalarySchema);