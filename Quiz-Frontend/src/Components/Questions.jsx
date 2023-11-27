import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useYourContext } from "../YourContextProvider"; // Adjust the import path

const Questions = () => {
  const { state } = useYourContext();
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [categoryHeading, setCategoryHeading] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResultButton, setShowResultButton] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [canAnswer, setCanAnswer] = useState(true);

  // State variable to store the username
  const [username, setUsername] = useState(state.userName || "RRR");

  const navigate = useNavigate();

  const fetchQuestionsByCategory = () => {
    axios
      .get(`http://localhost:4000/get-questionCategory/${categoryId}`)
      .then((response) => {
        if (response.status === 200 && response.data) {
          setQuestions(response.data.data.questions);
          setCategoryHeading(response.data.data);
          setAnsweredQuestions(
            Array(response.data.data.questions.length).fill(false)
          );
        }
      })
      .catch((error) => {
        console.log("Error while fetching questions by category", error);
      });
  };

  useEffect(() => {
    fetchQuestionsByCategory();

    const timer = setInterval(() => {
      if (canAnswer) {
        setTimeLeft((prevTime) => prevTime + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [categoryId, canAnswer]);

  const handleOptionClick = (questionIndex, optionIndex) => {
    if (canAnswer && !answeredQuestions[questionIndex]) {
      setCanAnswer(false);
      setAttempts(attempts + 1);
      const selectedQuestion = questions[questionIndex];
      if (selectedQuestion.correctOptionIndex === optionIndex) {
        setScore(score + 1);
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setWrongAnswers(wrongAnswers + 1);
      }

      handleNextQuestion();
    } else if (!canAnswer) {
      alert("You have already answered this question.");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCanAnswer(true);
    } else {
      setCanAnswer(false);
      setShowResultButton(true);
    }
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowResult = () => {
    setOpen(true);
    setCanAnswer(false);
  };

  // Calculate the percentage
  const percentage = ((correctAnswers / attempts) * 100).toFixed(2);

  const handleStartAgain = () => {
    // Reset state variables for a fresh quiz
    setUsername(state.userName || "RRR");
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(0);
    setShowResultButton(false);
    setAttempts(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setCanAnswer(true);
    setAnsweredQuestions(Array(questions.length).fill(false));
    navigate(`/questions/${categoryId}`);
    setOpen(false);
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="Question_container">
        <h2 className="category_heading">
          {categoryHeading.question_category}
        </h2>

        <div className="d-flex justify-content-between align-items-center">
          <section className="timer">{timeLeft}</section>
          <section className="Score_obtain">
            <h4 className="fw-semibold me-5">SCORE: {score}</h4>
          </section>
        </div>

        <div className="number_of_question">
          {currentQuestionIndex + 1}/{questions.length}
        </div>
        <div>
          {currentQuestionIndex < questions.length && (
            <div className="question_content">
              <p className="my-4 question_display">
                {questions[currentQuestionIndex].question}
              </p>
              <div className="option_section">
                {questions[currentQuestionIndex].options.map(
                  (option, optionIndex) => (
                    <p
                      key={optionIndex}
                      onClick={() =>
                        handleOptionClick(currentQuestionIndex, optionIndex)
                      }
                    >
                      {option}
                    </p>
                  )
                )}
              </div>
            </div>
          )}
        </div>
        <div className="d-flex">
          {showResultButton ? (
            <button onClick={handleShowResult} className="question_button">
              Show Result
            </button>
          ) : (
            <button onClick={handleNextQuestion} className="question_button">
              Next Question
            </button>
          )}
        </div>
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Quiz Result"}</DialogTitle>
        <DialogContent>
          <DialogContentText className="dialog_content_text">
            <p>{username} Your Result is:</p>

            <p> Your Score is: {score}</p>

            <p>
              {" "}
              Total Time Taken: <strong>{timeLeft}</strong> seconds
            </p>

            <p> Total Questions: {questions.length}</p>

            <p>Attempts: {attempts}</p>

            <p>Correct: {correctAnswers}</p>

            <p> Wrong: {wrongAnswers}</p>

            <p>
              Percentage: <strong>{percentage} %</strong>
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "center", margin: "auto", display: "flex" }}
        >
          <Button onClick={handleGoToHome} className="question_button">
            Go to Home
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Questions;
