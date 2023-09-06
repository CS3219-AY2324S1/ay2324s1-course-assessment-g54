const express = require("express");

const app = express();
const PORT = 3002;

app.post("/login", (req, res) => {
  res.send("Hello from the login endpoint!");
});

app.post("/logout", (req, res) => {
  res.send("Hello from the logout endpoint!");
});

app.get("/profile", (req, res) => {
  res.send("Hello from the profile endpoint!");
});

app.post("/profile", (req, res) => {
  res.send("Hello from the profile endpoint!");
});

app.post("/signup", (req, res) => {
  res.send("Hello from the login endpoint!");
});

app.listen(PORT, () => {
  console.log(`Users app listening on port ${PORT}`);
});