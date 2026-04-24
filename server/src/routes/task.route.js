import express from "express"
import { addTask, deleteTask, editTask, getAllTasks, getSingleTask } from "../controllers/task.controller.js";
import { validateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(validateJWT)
router.route("/").get(getAllTasks).post(addTask)
router.route("/:taskId").get(getSingleTask).patch(editTask).delete(deleteTask)


export default router