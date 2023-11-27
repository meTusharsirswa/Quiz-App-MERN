const express = require("express");
const Question = require("../model/Question");
const QuestionCategory = require("../model/QuestionCategory");

const PostQuestion = async (req, res) => {
  const { question, question_category , options , correctOptionIndex } = req.body;

  const newQuestion = new Question({ question, question_category , options , correctOptionIndex });
  await newQuestion.save();

  await QuestionCategory.findByIdAndUpdate(
    question_category,
    { $push: { questions: newQuestion._id } },
    { new: true }
  );

  res.json({
    status: true,
    message: "Question Created Successfully !!!",
    data: newQuestion,
  });
}

const GetQuestion = async (req, res) => {
  const questions = await Question.find({}).populate("question_category");
  res.json({
    status: true,
    message: "Question List Fetched !!!",
    data: questions,
  });
}

module.exports = {
  PostQuestion,
  GetQuestion,
};
