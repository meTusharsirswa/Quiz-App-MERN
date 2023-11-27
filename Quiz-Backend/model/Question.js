const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // Store options as an array of strings
  correctOptionIndex: { type: Number, required: true },
  question_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionCategory",
  },
}, { timestamps: true });


module.exports = mongoose.model("Questions", QuestionSchema);
