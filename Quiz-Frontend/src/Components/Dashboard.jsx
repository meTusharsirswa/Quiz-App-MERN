import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useYourContext } from '../YourContextProvider'; // Import your context provider

const Dashboard = () => {
  const { dispatch } = useYourContext();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState([]);
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEnterClick = async () => {
    axios
      .post('http://localhost:4000/register-user', { user_name: userName })
      .then((response) => {
        if (response.status === 200 && response.data) {
          setMessage(response.data.message);
          dispatch({ type: 'SET_USER_NAME', payload: userName });
          setIsNameSubmitted(true); // Enable category selection after name is submitted
        }
        setUserName('');
      })
      .catch((error) => {
        setMessage('Error while saving user name');
        console.log(error);
      });
  };

  const fetchQuestionCategories = () => {
    axios
      .get('http://localhost:4000/get-questionCategory')
      .then((response) => {
        if (response.status === 200 && response.data) {
          setCategory(response.data.data);
        }
      })
      .catch((error) => {
        console.log('Error while fetching question categories', error);
      });
  };

  useEffect(() => {
    if (isNameSubmitted) {
      fetchQuestionCategories();
    }
  }, [isNameSubmitted]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/questions/${categoryId}`);
  };

  return (
    <div className="dashboard_contene">
      <div className="home_container">
        <img
          width={'200px'}
          className="mx-auto logo"
          src="../../public/quiz-logo.png"
          alt=""
        />
        <h1 className="fw-semibold text-info">Hello user !</h1>
        <h3>Enter Your Name to continue the Quiz.</h3>
        <div className="text_btn ">
          <TextField
            id="outlined-basic"
            label="Enter Your Name "
            className="user_textField"
            value={userName}
            variant="outlined"
            onChange={handleNameChange}
          />

          <Button
            variant="contained"
            size="large"
            className="text_btn"
            onClick={handleEnterClick}
          >
            Enter
          </Button>
        </div>
        {/* <h5 className="my-4">You'll have 10 Seconds to answer each question.</h5> */}
      </div>
      {isNameSubmitted && (
        <>
          <h1 className="fw-semibold text-info mx-auto d-flex justify-content-center">
            Select Category
          </h1>
          <div className="category_container">
            {category.map((category) => (
              <div
                key={category._id}
                className="category_section"
                onClick={() => handleCategoryClick(category._id)}
              >
                <h5 className="mx-auto d-flex justify-content-center fw-semibold">
                  {category.question_category}
                </h5>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
