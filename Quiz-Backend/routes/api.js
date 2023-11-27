const express = require("express");
const router = express.Router();

// const Dashboard = require("../Controller/DashboardController")
// User Routes
const { UserDetail, getUserDetail } = require("../Controller/UserController");
router.route("/register-user").post(UserDetail);
router.route("/get-user-data").get(getUserDetail);

const {
  postQuestionCategory,
  getQuestionCategory,
  getQuestionCategoryById
} = require("../Controller/QuestionCategory-Controller");
router.route("/post-questionCategory").post(postQuestionCategory);
router.route("/get-questionCategory").get(getQuestionCategory);
router.route("/get-questionCategory/:id").get(getQuestionCategoryById);

const {GetQuestion ,PostQuestion} = require("../Controller/Question")
router.route("/post-question").post(PostQuestion);
router.route("/get-question").get(GetQuestion);

module.exports = router;
