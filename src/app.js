import express from "express";
import path from "path";
import cors from "cors";
import workoutRoutes from "./routes/workoutRoutes.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "../public")));

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

export default app;