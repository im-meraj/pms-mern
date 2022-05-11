// Libraries:

// • express
import express from 'express';

// Controllers
import { getAllLeaveApplications } from '../../../controllers/adminLeaveApplicationController';

// Middlewares
import { protect } from '../../../middleware/authMiddleware';

const Router = express.Router();

Router.route('/').get(protect, getAllLeaveApplications);
// Router.route('/:id').put(protect, updateDepartment).delete(protect, deleteDepartment);

export default Router;