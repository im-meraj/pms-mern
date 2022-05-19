// Libraries:

// • express
import express from 'express';

// Controllers
import { getAllSalariesByMonthAndYear, addSalary } from '../../controllers/salaryController';

// Middlewares
import { protect } from '../../middleware/authMiddleware';

const Router = express.Router();

Router.route('/:id').get(protect, getAllSalariesByMonthAndYear).post(protect, addSalary);
// Router.route('/one/:id').get(protect, getSpecificLeaveApplication).put(protect, updateLeaveApplicationStatus);
// Router.route('/:id').get(protect, getLeaveApplications).post(protect, setLeaveApplication);
// Router.route('/:id').put(protect, updateDepartment).delete(protect, deleteDepartment);

export default Router;