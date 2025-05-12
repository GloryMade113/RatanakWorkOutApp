import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import workoutRoutes from "./routes/workoutRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the "src/views" folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "views")));

// API Routes
app.use("/api", workoutRoutes);

// Serve the index.html file with embedded schedule
app.get("/", (req, res) => {
    const schedule = {
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

    res.sendFile(path.join(__dirname, "views/index.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});