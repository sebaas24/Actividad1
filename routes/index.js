/*
var express = require('express');
var router = express.Router();
const Habit = require('../modelo/Habit');

// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/habits', async function(req, res, next) {
  const {title,description} = req.body;
  const habit = new Habit({title,description});
  await habit.save();
  res.json(habit);
});

module.exports = router;
*/

var express = require('express');
var router = express.Router();
const Habit = require('../modelo/Habit');

// Obtener todos los hábitos
router.get('/habits', async function(req, res) {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener hábitos', error });
  }
});

// Crear un nuevo hábito
router.post('/habits', async function(req, res) {
  try {
    const { title, description } = req.body;
    const habit = new Habit({ title, description });
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear habito', error });
  }
});

// Actualizar un hábito por ID
router.put('/habits/:id', async function(req, res) {
  try {
    const { title, description } = req.body;
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );
    if (!updatedHabit) {
      return res.status(404).json({ message: 'Habito no encontrado' });
    }
    res.json(updatedHabit);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar habito', error });
  }
});

// Eliminar un hábito por ID
router.delete('/habits/:id', async function(req, res) {
  try {
    const deletedHabit = await Habit.findByIdAndDelete(req.params.id);
    if (!deletedHabit) {
      return res.status(404).json({ message: 'Habito no encontrado' });
    }
    res.json({ message: 'Habito eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar habito', error });
  }
});

module.exports = router;
