import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

//Environment Configuration
dotenv.config();

const port = process.env.PORT || 4000;

//Database connection
import connectDB from './config/db';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
}));
app.use(helmet());

//Routes
import authRoutes from './routes/Auth';
import employeeRoutes from './routes/Employee';
import departmentRoutes from './routes/Department';
import designationRoutes from './routes/Designation';
import leaveApplicationRoutes from './routes/LeaveApplication';
import gradeRoutes from './routes/Grade';

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/designation", designationRoutes);
app.use("/api/leaveApplicationEmployee", leaveApplicationRoutes);
app.use("/api/grade", gradeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});