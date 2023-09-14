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
  res.status(200).send();
});

app.get("/profile", handlers.handleGetProfile);

app.put("/profile", handlers.handleUpdateProfile);

app.post("/signup", handlers.handleSignup);

app.listen(PORT, () => {
  console.log(`Users app listening on port ${PORT}`);
});
