import express from "express";
import { JSONFilePreset } from "lowdb/node";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const defaultData = {
  todos: [
    {
      id: "1",
      name: "Do the dishes",
      duration: "2 hours",
      complexity: "medium",
      done: true,
    },
    {
      id: "2",
      name: "Complete the project report",
      duration: "",
      complexity: "",
      done: false,
    },
    {
      id: "3",
      name: "Exercise",
      duration: "",
      complexity: "",
      done: false,
    },
    {
      id: "4",
      name: "Read a book",
      duration: "",
      complexity: "",
      done: false,
    },
    {
      id: "5",
      name: "Grocery shopping",
      duration: "",
      complexity: "",
      done: false,
    },
    {
      id: "6",
      name: "Clean the house",
      duration: "4 hours",
      complexity: "easy",
      done: true,
    },
    {
      id: "7",
      name: "Pay bills",
      duration: "",
      complexity: "",
      done: false,
    },
    {
      id: "8",
      name: "Prepare for meeting",
      duration: "",
      complexity: "",
      done: false,
    },
    {
      id: "9",
      name: "Call parents",
      duration: "",
      complexity: "",
      done: false,
    },
    {
      id: "10",
      name: "Write a blog post",
      duration: "",
      complexity: "",
      done: false,
    },
  ],
};
const db = await JSONFilePreset("db.json", defaultData);
const port = 3000;

app.get("/todos", async (req, res) => {
  const todos = await db.data.todos;
  res.json(todos);
});

app.get("/todos/:id", async (req, res) => {
  const todo = await db.data.todos.find((todo) => todo.id === req.params.id);

  if (!todo) return res.send(404);

  res.json(todo);
});

app.patch("/todos/:id", async (req, res) => {
  const targetIndex = db.data.todos.findIndex(
    (todo) => todo.id === req.params.id
  );
  const target = db.data.todos[targetIndex];

  const todo = {
    ...target,
  };

  const { complexity, duration, done } = req.body;

  if (complexity) todo.complexity = complexity;
  if (duration) todo.duration = duration;

  if (done && (!complexity || !duration)) {
    return res.status(400).json({
      error: "Can't complete todo without complexity or duration missing",
    });
  }

  if (done && complexity && duration) {
    todo.done = true;
  }

  await db.update(({ todos }) => {
    todos[targetIndex] = todo;
  });

  res.json(todo);
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
