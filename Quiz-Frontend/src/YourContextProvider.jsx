import React, { createContext, useContext, useReducer } from 'react';

// Define your initial state
const yourReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload };
    // Add more cases for other state updates if needed
    default:
      return state;
  }
};

const initialState = {
  userName: '', // Add more properties if needed
};

// Create a context
const YourContext = createContext();

// Create a context provider
export const YourContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(yourReducer, initialState); // yourReducer is your state management logic

  return (
    <YourContext.Provider value={{ state, dispatch }}>
      {children}
    </YourContext.Provider>
  );
};

// Create a custom hook for using the context
export const useYourContext = () => {
  return useContext(YourContext);
};
