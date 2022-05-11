// Libraries:

// • express
import express from 'express';

// Controllers
import { getDesignations, setDesignation, updateDesignation, deleteDesignation } from '../../controllers/designationController';

// Middlewares
import { protect } from '../../middleware/authMiddleware';

const Router = express.Router();

Router.route('/').get(protect, getDesignations).post(protect, setDesignation);
Router.route('/:id').put(protect, updateDesignation).delete(protect, deleteDesignation);

export default Router;