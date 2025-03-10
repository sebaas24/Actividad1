var express = require('express');
var router = express.Router();
const Habit = require('../modelo/Habit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/habits', async function(req, res, next) {
  const {title,description} = req.body;
  const habit = new Habit({title,description});
  await habit.save();
  res.json(habit);
});

module.exports = router;
