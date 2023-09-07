import dotenv from "dotenv";
import express from "express";
import QuestionRouter from "./routes/questionRoutes.js";

dotenv.config("./.env");
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/question', QuestionRouter)

app.listen(port, () => {
    console.log(`Question Service is running on port: ${port}`);
})
