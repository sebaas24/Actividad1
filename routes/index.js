var express = require('express');
var router = express.Router();
const Habit = require('../modelo/Habit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/habits", async (req, res) => {
  try {
    const habit = new Habit(req.body);
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los hábitos
router.get("/habits", async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

// Actualizar un hábito
router.put("/habits/:id", async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(habit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un hábito
router.delete("/habits/:id", async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: "Hábito eliminado" });
});
module.exports = router;
