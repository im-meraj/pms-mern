// Libraries:

// • express
import express from 'express';

// Controllers
import { getLeaveApplications, setLeaveApplication, getAllLeaveApplications, getSpecificLeaveApplication, updateLeaveApplicationStatus, deleteLeaveApplication } from '../../controllers/leaveApplicationController';

// Middlewares
import { protect } from '../../middleware/authMiddleware';

const Router = express.Router();

Router.route('/').get(protect, getAllLeaveApplications);
Router.route('/one/:id').get(protect, getSpecificLeaveApplication).put(protect, updateLeaveApplicationStatus).delete(protect, deleteLeaveApplication);
Router.route('/:id').get(protect, getLeaveApplications).post(protect, setLeaveApplication);
// Router.route('/:id').put(protect, updateDepartment).delete(protect, deleteDepartment);

export default Router;