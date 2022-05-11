import mongoose from "mongoose";

const SalarySchema = new mongoose.Schema({
    gradeId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Grade" }],
    basicSalary: { type: Number, required: true },
    da: { type: Number, required: true },
    employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }]
}, {
    timestamps: true
});

export const SalaryModel = mongoose.model("Salary", SalarySchema);