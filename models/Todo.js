const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: Date,
  priority: { type: Number, min: 1, max: 3 }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
