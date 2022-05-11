// Libraries:

// • express
import express from 'express';

// Controllers
import { getEmployee, getAllEmployees, setEmployee, updateEmployee, deleteEmployee } from '../../controllers/userController';

// Middlewares
import { protect } from '../../middleware/authMiddleware';

const Router = express.Router();

Router.route('/').get(protect, getAllEmployees).post(protect, setEmployee);
Router.route('/:id').get(protect, getEmployee).put(protect, updateEmployee).delete(protect, deleteEmployee);

export default Router;