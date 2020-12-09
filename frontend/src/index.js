import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import UserContextProvider from './context/UserContext'

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";

import reportWebVitals from './reportWebVitals';

import './index.css';
import NotificationContextProvider from "./context/NotificationContext";

ReactDOM.render(
        <ThemeProvider theme={theme}>
            <NotificationContextProvider>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </NotificationContextProvider>
        </ThemeProvider>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
