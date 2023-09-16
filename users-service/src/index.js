import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import * as handlers from "./handlers.js";
import morgan from "morgan";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("tiny"));

app.post("/login", handlers.handleLogin);

app.post("/logout", (req, res) => {
  res.status(200).send();
});

app.get("/profile", handlers.handleGetProfile);

app.put("/profile", handlers.handleUpdateProfile);

app.delete("/profile", handlers.handleDeleteProfile);

app.post("/signup", handlers.handleSignup);

app.listen(PORT, () => {
  console.log(`Users app listening on port ${PORT}`);
});
