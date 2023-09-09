import dotenv from "dotenv";
import mongoose from "mongoose";
import sampleQuestions from "./routes/sampleQuestions.js";
import { Question } from "./model/question.js";

dotenv.config("./.env");

const uri = process.env.MONGO_OPTION == "cloud" ? process.env.MONGO_CLOUD_URI : process.env.MONGO_LOCAL_URI;
const connectionOptions = {dbName: `peerprep-database`};

mongoose.connect(uri, connectionOptions)
  .then(() => console.log("Successfully connected to MonogDB!"))
  .catch(() => console.log("Failed to connect to MongoDB!"));


const question = new Question(sampleQuestions[0]);

async function createSampleQuestion() {
  await question.save();
}

async function getQuestions() {
  return await Question.find(); 
}

createSampleQuestion()
  .then(() => {console.log("question saved")})
  .then(() => getQuestions())
  .then((q) => console.log(q))
  .catch(error => console.log(error));
