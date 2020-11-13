import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import UserContextProvider from './context/UserContext'

import {ThemeProvider} from "@material-ui/core/styles";
import theme from "./theme/theme";

import reportWebVitals from './reportWebVitals';

import './index.css';

ReactDOM.render(

      <ThemeProvider theme={theme}>
          <UserContextProvider>
              <App />
          </UserContextProvider>
      </ThemeProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
