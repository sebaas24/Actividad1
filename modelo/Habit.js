const mongoose = require('mongoose');
const habitSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    streak: { type: Number, default: 0 },
    lastCompleted: { type: Date },
})

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;