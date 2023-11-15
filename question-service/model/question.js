import mongoose from "mongoose";
import { COMPLEXITIES_ARR } from "./constants.js";

const questionSchema = new mongoose.Schema({
  question_id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  categories: [{
    type: String,
    trim: true,
  }],
  complexity: {
    type: String,
    required: true,
    enum: COMPLEXITIES_ARR,
  },
  link: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
});

export const Question = mongoose.model('Question', questionSchema);