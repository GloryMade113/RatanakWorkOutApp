import express from "express";
import WorkoutController from "../controllers/workoutController.js";

const router = express.Router();
const workoutController = new WorkoutController();

router.get('/schedule', workoutController.getWorkoutSchedule);
router.post('/add', workoutController.addWorkout);

export default router;