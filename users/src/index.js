require("reflect-metadata");
const express = require("express");

const PORT = process.env.PORT;

const app = express();

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

app.post("/signup", (req, res) => {
  res.send("Hello from the signup endpoint!");
});

app.listen(PORT, () => {
  console.log(`Users app listening on port ${PORT}`);
});
