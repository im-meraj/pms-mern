import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema({
    gradeId: { type: String, required: true },
    gradeName: { type: String, required: true },
    basic: { type: Number, required: true },
}, {
    timestamps: true
});

export const GradeModel = mongoose.model("Grade", GradeSchema);