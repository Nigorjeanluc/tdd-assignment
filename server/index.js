import express from 'express';
import dotenv from 'dotenv';

const app = express();
const todos = [
  {
    id: 1,
    title: 'Some title One',
    completed: false,
    priority: 3,
  },
  {
    id: 2,
    title: 'Some title Two',
    completed: false,
    priority: 2,
  },
  {
    id: 3,
    title: 'Some title Three',
    completed: 'false',
    priority: 1,
  },
];

dotenv.config();


app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the TDD Concept App' });
});

app.get('/todos', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Retrieved all todos',
        data: todos,
    });
});


// app.get('todos/:id', (req, res) => {
//     console.log(res.params);
//     const matchTodo = todos.find((todo) => todo.id === parseInt(res.params.id, 10));
//     res.status(200).json({
//         status: 200,
//         message: 'Fetched todo successful',
//         data: matchTodo,
//     });
// });

app.get('/*', (req, res) => {
    res.sendStatus(404);
});

app.listen(process.env.PORT, () => {
    console.log(`App running on PORT ${process.env.PORT}`);
});