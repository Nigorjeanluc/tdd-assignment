import express from 'express';
import dotenv from 'dotenv';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const todos = [
  {
    id: 1,
    title: 'Some title One',
    completed: false,
    priority: 3
  },
  {
    id: 2,
    title: 'Some title Two',
    completed: false,
    priority: 2
  },
  {
    id: 3,
    title: 'Some title Three',
    completed: false,
    priority: 1
  }
];

dotenv.config();


app.get('/', (req, res) => {
  return res.send({ message: 'Welcome to the TDD Concept App' });
});

app.get('/tasks', (req, res) => {
  return res.status(200).json({
    status: 200,
    message: 'Retrieved all tasks',
    data: todos,
  });
});

app.post('/tasks', (req, res) => {
  const id = todos.length + 1;
  todos.push({id, ...req.body});
  const matchTodo = todos.find((todo) => todo.id === parseInt(id, 10));
  return res.status(201).json({
      status: 201,
      message: 'Retrieved all tasks',
      data: matchTodo
  });
});

app.get('/tasks/:id', (req, res) => {
  const matchTodo = todos.find((todo) => todo.id === parseInt(req.params.id, 10));
  return res.status(200).json({
    status: 200,
    message: 'Task is fetched successfully',
    data: matchTodo,
  });
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(todo => todo.id === id);
  todos.splice(todos.indexOf(todo), 1);
  return res.sendStatus(204);
});

app.patch('/tasks/:id', (req, res)=>{
  const taskId = parseInt(req.params.id, 10);
  const updatedTodo = req.body;

  todos.map((todo, index) => {
    if(todo.id === taskId) {
      todo.id        = parseInt(updatedTodo.id, 10)    || todo.id;
      todo.title     = updatedTodo.title || todo.title;
      todo.completed = updatedTodo.completed || todo.completed;
      todo.priority  = updatedTodo.priority || todo.priority;

      return res.status(200).json({
        status: 200,
        message: 'todo updated successfully',
        data: todo
      });
    }
  })

  return res.status(404).json({
    status: 404,
    error: 'The given id is not found'
  });
});

app.get('/*', (req, res) => {
  return res.status(404).json({
    status: 404,
    error: 'Not Found'
  });
});

app.listen(process.env.PORT, () => {
    console.log(`App running on PORT ${process.env.PORT}`);
});

export { todos };
export default app;
