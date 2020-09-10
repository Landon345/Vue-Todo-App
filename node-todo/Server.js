require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const db = require("./db-connection");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
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
app.get("/api/todos", authenticateToken, async (req, res) => {
  console.log("username", req.user);
  const todos = await db.query(
    `SELECT * FROM todos where username = '${req.user.user.name}' ORDER BY todo_id`
  );
  res.send(todos.rows);
});
app.get("/api/todos/:id", authenticateToken, async (req, res) => {
  const todo = await db.query(
    `SELECT * FROM todos where id = ${req.params.id}`
  );
  res.send(todo.rows);
});

app.post("/api/todos", authenticateToken, async (req, res) => {
  console.log("post a new todo", req.user);
  const reqBody = req.body;
  console.log("post new todo  ", req.user.user.name);
  // res.send(req.body);
  try {
    await db.query(
      `insert into todos (username, title, done) values ('${req.user.user.name}', '${reqBody.title}', ${reqBody.done})`
    );
  } catch (e) {
    console.log(e);
    res.send(e);
  }
  res.send(req.body);
});

app.put("/api/todos", authenticateToken, async (req, res) => {
  const reqBody = req.body;
  try {
    await db.query(
      `update todos set done = ${reqBody.done}, title = '${reqBody.title}' where todo_id = ${reqBody.todo_id} and username = '${req.user.user.name}'`
    );
  } catch (e) {
    console.log(e);
    res.send(e);
  }
  res.send(req.body);
});

app.delete("/api/todos/:id", authenticateToken, async (req, res) => {
  console.log("delete todo", req.user);
  try {
    await db.query(
      `delete from todos where todo_id = ${req.params.id} and username = '${req.user.user.name}'`
    );
  } catch (e) {
    console.log(e);
    res.send(e);
  }
  res.send(req.params.id);
});

app.post("/api/login", async (req, res) => {
  // Authenticate user
  const results = await db.query(
    `SELECT * from users where username = '${req.body.username}' and password = '${req.body.password}'`
  );
  console.log("results from login", results);
  //create jsonwebtoken for the user
  if (results.rows.length === 1) {
    const username = results.rows[0].username;
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    try {
      await db.query(
        `update users set api_key = '${accessToken}' where username = '${username}'`
      );
    } catch (e) {
      console.log(e);
    }
    res.json({ name: username, accessToken: accessToken });
  } else {
    res.json({ message: "username or password incorrect" });
  }
});
app.post("/api/register", async (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  try {
    if (req.body.username) {
      await db.query(
        `insert into users (username, password, api_key) values ('${req.body.username}', '${req.body.password}', '${accessToken}')`
      );
    } else {
      console.log("no username provided");
    }
  } catch (e) {
    console.log(e);
    res.send(e, 500);
  }
  res.json({ username: req.body.username, accessToken: accessToken });
});
app.post("/api/logout", authenticateToken, async (req, res) => {
  db.query(
    `update users set api_key = null where username = '${req.user.user.name}'`
  );
  res.json({ message: `Logged out ${req.user.user.name}` });
});

// app.use('/', require('./users'));
// app.use('/', require('./stocks'));

//middleware
async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  const results = await db.query(
    `Select api_key from users where api_key = '${token}'`
  );

  if (results.rows.length === 0) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    req.user = { user: user, token: token };
    next();
  });
}

app.listen(5000, () => console.log("listening on port 5000...."));
