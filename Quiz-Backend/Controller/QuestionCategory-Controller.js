const express = require("express");
const QuestionCategory = require("../model/QuestionCategory");

const postQuestionCategory = async (req, res) => {
  const { question_category } = req.body;

  const newCategory = new QuestionCategory({ question_category, questions: [] });
  await newCategory.save();

  res.json({
    status: true,
    message: "Question Category Saved Successfully !!!",
    data: newCategory,
  });
}

const getQuestionCategory = async (req, res) => {
  const categories = await QuestionCategory.find({}).populate("questions");
  res.json({
    status: true,
    message: "Question Category List Fetched !!!",
    data: categories,
  });
}

const getQuestionCategoryById = async (req, res) => {
  const category = await QuestionCategory.findById(req.params.id).populate('questions');
  res.status(200).json({
    status: true,
    message: "Question Category Fetched By Id !!!",
    data: category,
  });
}

module.exports = {
  postQuestionCategory,
  getQuestionCategory,
  getQuestionCategoryById,
};
