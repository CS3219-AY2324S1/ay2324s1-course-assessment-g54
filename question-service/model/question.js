import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question_id: Number,
  question_title: String,
  question_categories: [String],
  question_complexity: String,
  link: String,
  question_description: String,
})

export const Question = mongoose.model('Question', questionSchema);