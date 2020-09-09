// const {Client} = require('pg');
const express = require("express");
const app = express();
const db = require("./db-connection");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, OPTIONS, GET");
  next();
});
const options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  },
};

app.use(express.static("public", options));
const router = express.Router([options]);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

app.get("/", async (req, res) => {
  res.send("server on");
});
app.get("/api/todos", async (req, res) => {
  const todos = await db.query("SELECT * FROM todos ORDER BY id");
  res.send(todos.rows);
});
app.get("/api/todos/:id", async (req, res) => {
  const todo = await db.query(
    `SELECT * FROM todos where id = ${req.params.id}`
  );
  res.send(todo.rows);
});

app.post("/api/todos", async (req, res) => {
  const reqBody = req.body;
  // res.send(req.body);
  try {
    await db.query(
      `insert into todos (title, done) values ('${reqBody.title}', ${reqBody.done})`
    );
  } catch (e) {
    console.log(e);
    res.send(e);
  }
  res.send(req.body);
});

app.put("/api/todos", async (req, res) => {
  const reqBody = req.body;
  try {
    await db.query(
      `update todos set done = ${reqBody.done}, title = '${reqBody.title}' where id = ${reqBody.id}`
    );
  } catch (e) {
    console.log(e);
    res.send(e);
  }
  res.send(req.body);
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    await db.query(`delete from todos where id = ${req.params.id}`);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
  res.send(req.params.id);
});
// app.use('/', require('./users'));
// app.use('/', require('./stocks'));

app.listen(5000, () => console.log("listening on port 5000...."));
