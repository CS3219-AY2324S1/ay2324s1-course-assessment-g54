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

app.get("/ownHistory", handlers.handleGetOwnHistoryRecords);

app.post("/addHistory", handlers.handleCreateHistoryRecord);

app.delete("/deleteRecordsForCurrentUser", handlers.handleDeletedUser);

app.delete("/deleteRecordsForDeletedQuestion/:questionId", handlers.handleDeletedQuestion);

app.listen(PORT, () => {
  console.log(`Users app listening on port ${PORT}`);
});
