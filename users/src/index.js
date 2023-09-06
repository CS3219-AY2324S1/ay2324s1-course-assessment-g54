const express = require("express");
const handlers = require("./handlers");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
  res.send("Hello from the login endpoint!");
});

app.post("/logout", (req, res) => {
  res.send("Hello from the logout endpoint!");
});

app.get("/profile", (req, res) => {
  res.send("Hello from the get profile endpoint!");
});

app.post("/profile", (req, res) => {
  res.send("Hello from the update profile endpoint!");
});

app.get("/role", (req, res) => {
  res.send("Hello from the role endpoint!");
});

app.post("/signup", handlers.handleSignup);

app.listen(PORT, () => {
  console.log(`Users app listening on port ${PORT}`);
});
