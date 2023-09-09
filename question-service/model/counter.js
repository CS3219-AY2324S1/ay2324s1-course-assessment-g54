import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    _id: String,
    seq: Number,
}, { _id: false });

export const Counter = mongoose.model('Counter', counterSchema);

