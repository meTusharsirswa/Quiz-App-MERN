const mongoose = require("mongoose");

const QuestionCategorySchema = new mongoose.Schema(
  {
    question_category: { type: String, required: true },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuestionCategory", QuestionCategorySchema);
