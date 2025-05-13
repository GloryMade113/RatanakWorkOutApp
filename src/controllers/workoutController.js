import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const progressFile = path.join(__dirname, '../../progress-data.json');

function readProgressData() {
    try {
        return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
    } catch (e) {
        return {};
    }
}
function writeProgressData(data) {
    fs.writeFileSync(progressFile, JSON.stringify(data, null, 2), 'utf8');
}

class WorkoutController {
    constructor() {
        this.schedule = {
            Monday: {
                type: "Full body",
                exercises: {
                    Chest: [
                        { name: "Incline Dumbbell press", reps: 12, sets: 1 },
                        { name: "Weighted Push up", reps: 12, sets: 1 },
                        { name: "Dumbbell fly", reps: 12, sets: 1 }
                    ],
                    Back: [
                        { name: "Pull up", reps: 12, sets: 2 }
                    ],
                    Bicep: [
                        { name: "Hammer curl", reps: 12, sets: 1 },
                        { name: "Preacher curl", reps: 12, sets: 1 }
                    ],
                    Shoulder: [
                        { name: "Lateral raises", reps: 12, sets: 2 }
                    ],
                    Leg: [
                        { name: "Squat", reps: 12, sets: 2 }
                    ]
                }
            },
            Tuesday: { type: "Rest" },
            Wednesday: { type: "Full body" },
            Thursday: { type: "Full body" },
            Friday: { type: "Rest" },
            Saturday: { type: "Full body" },
            Sunday: { type: "Full body" }
        };

        // Bind methods to the class instance
        this.getWorkoutSchedule = this.getWorkoutSchedule.bind(this);
        this.addWorkout = this.addWorkout.bind(this);
        this.getUserProgress = this.getUserProgress.bind(this);
        this.setUserProgress = this.setUserProgress.bind(this);
    }

    getWorkoutSchedule(req, res) {
        // Clone Monday's exercises for all "Full body" days
        const fullBodyExercises = this.schedule.Monday.exercises;
        const updatedSchedule = { ...this.schedule };

        Object.keys(updatedSchedule).forEach(day => {
            if (updatedSchedule[day].type === "Full body") {
                updatedSchedule[day].exercises = fullBodyExercises;
            }
        });

        res.json(updatedSchedule);
    }

    addWorkout(req, res) {
        const { day, workout } = req.body;
        if (this.schedule[day]) {
            this.schedule[day] = workout;
            res.status(200).json({ message: "Workout added successfully!" });
        } else {
            res.status(400).json({ message: "Invalid day!" });
        }
    }

    getUserProgress(req, res) {
        const user = req.query.user;
        if (!user) return res.status(400).json({ error: 'User required' });
        const allData = readProgressData();
        res.json(allData[user] || {});
    }

    setUserProgress(req, res) {
        const user = req.body.user;
        const progress = req.body.progress;
        if (!user || !progress) return res.status(400).json({ error: 'User and progress required' });
        const allData = readProgressData();
        allData[user] = progress;
        writeProgressData(allData);
        res.json({ success: true });
    }
}

export default WorkoutController;