// Libraries:

// • express
import express from 'express';

// Controllers
import { getLeaveApplications, setLeaveApplication, getAllLeaveApplications, getSpecificLeaveApplication } from '../../controllers/leaveApplicationController';

// Middlewares
import { protect } from '../../middleware/authMiddleware';

const Router = express.Router();

Router.route('/').get(protect, getAllLeaveApplications);
Router.route('/one/:id').get(protect, getSpecificLeaveApplication);
Router.route('/:id').get(protect, getLeaveApplications).post(protect, setLeaveApplication);
// Router.route('/:id').put(protect, updateDepartment).delete(protect, deleteDepartment);

export default Router;