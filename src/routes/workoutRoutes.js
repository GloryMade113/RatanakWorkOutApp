import express from "express";
import WorkoutController from "../controllers/workoutController.js";

const router = express.Router();
const workoutController = new WorkoutController();

router.get('/schedule', workoutController.getWorkoutSchedule);
router.post('/add', workoutController.addWorkout);
router.get('/progress', workoutController.getUserProgress);
router.post('/progress', workoutController.setUserProgress);

export default router;