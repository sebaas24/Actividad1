const mongoose = require('mongoose');
const habitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    lastdone: {
        type: Date,
        default: Date.now
    },
    days: {
        type: [String],
        default: 1
    },
    startedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Habit', habitSchema);

//const Habit = mongoose.model("Habit", habitSchema);
//module.exports = Habit;