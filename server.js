const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Todo = require('./models/Todo');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// GET /todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find().maxTimeMS(3000);
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /todos/:id
app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id).maxTimeMS(3000);
    if (!todo) {
      return res.status(404).json({ message: 'Todo Item Not Found' });
    }
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /todos
app.post('/todos', async (req, res) => {
  try {
    const { title } = req.body;
    const todo = new Todo({ title });
    await todo.save();
    res.json({ message: 'Todo Item Created Successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /todos/:id
router.put('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const { title, completed, dueDate, priority } = req.body;
  
    try {
      const todo = await Todo.findById(id).maxTimeMS(3000);
  
      if (!todo) {
        return res.status(404).json({ message: 'Todo Item not found' });
      }
  
      todo.title = title;
      todo.completed = completed;
      todo.dueDate = dueDate ? new Date(dueDate) : undefined;
      todo.priority = priority;
  
      await todo.save();
  
      res.json({ message: 'Todo Item Updated Successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

// DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByIdAndDelete(id).maxTimeMS(3000);
    if (!todo) {
      return res.status(404).json({ message: 'Todo Item Not Found' });
    }
    res.json({ message: 'Todo Item Deleted Successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });