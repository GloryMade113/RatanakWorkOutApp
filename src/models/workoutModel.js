const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    exercises: {
        chest: [{
            name: { type: String, required: true },
            reps: { type: Number, required: true },
            sets: { type: Number, required: true }
        }],
        back: [{
            name: { type: String, required: true },
            reps: { type: Number, required: true },
            sets: { type: Number, required: true }
        }],
        bicep: [{
            name: { type: String, required: true },
            reps: { type: Number, required: true },
            sets: { type: Number, required: true }
        }],
        shoulder: [{
            name: { type: String, required: true },
            reps: { type: Number, required: true },
            sets: { type: Number, required: true }
        }],
        leg: [{
            name: { type: String, required: true },
            reps: { type: Number, required: true },
            sets: { type: Number, required: true }
        }]
    }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;