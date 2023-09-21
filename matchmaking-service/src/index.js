import cors from "cors";
import express from "express";
import morgan from "morgan";

const PORT = process.env.PORT;

const app = express();

app.use(cors());
if (process.env.NODE_ENV === "development") app.use(morgan("tiny"));

app.listen(PORT, () => {
  console.log(`Matchmaking app listening on port ${PORT}`);
});
