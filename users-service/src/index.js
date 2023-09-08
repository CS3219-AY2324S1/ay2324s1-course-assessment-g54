import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import * as handlers from "./handlers.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", handlers.handleLogin);

app.post("/logout", (req, res) => {
  res.send("Hello from the logout endpoint!");
});

app.get("/profile", handlers.handleGetProfile);

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
