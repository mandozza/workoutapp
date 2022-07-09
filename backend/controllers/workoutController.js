const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
	const workouts = await Workout.find({}).sort({ createdAt: -1 });

	res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
	const { id } = req.params;
  // before hitting the database, check to see if the id is a valid type.
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such workout' });
	}

	const workout = await Workout.findById(id);

	if (!workout) {
		return res.status(404).json({ error: 'No such workout' });
	}

	res.status(200).json(workout);
};

// create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = []
  if (!title) {
    emptyFields.push('title')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (!load) {
    emptyFields.push('load')
  }

  if (emptyFields.length > 0) {
    console.log('here is empyty fields', emptyFields)
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  try {
      const workout = await Workout.create({ title, reps, load });
      // if good, send back the new workout.
      res.status(200).json(workout);
  } catch (err) {
      //send back error message.
      res.status(400).json({ error: err.message });
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
	// before hitting the database, check to see if the id is a valid type.
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such workout' });
	}

  // attempt delete.
  const workout = await Workout.findByIdAndDelete({_id: id});
  console.log('payload afer delete', workout);
  if (!workout) {
    return res.status(400).json({ error: 'No such workout' });
  }
  res.status(200).json(workout);
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  // before hitting the database, check to see if the id is a valid type.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }
  // attempt update.
  const workout = await Workout.findByIdAndUpdate({_id: id},{
    ...req.body
  });

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' });
  }

    res.status(200).json(workout);
}



module.exports = {
	getWorkouts,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
};
