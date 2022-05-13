// Libraries:

// • express
import express from "express";

// Controllers
import {
  getAllPayGrades,
  setGrade,
} from "../../controllers/gradeController";

// Middlewares
import { protect } from "../../middleware/authMiddleware";

const Router = express.Router();

Router.route("/").get(protect, getAllPayGrades).post(protect, setGrade);
// Router.route("/:id").put(protect, updateDesignation).delete(protect, deleteDesignation);

export default Router;
