const mongoose = require('mongoose');
const habitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;