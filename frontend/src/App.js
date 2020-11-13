import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Home from './pages/Home/Home'
import ShopTracker from "./pages/ShopTracker/ShopTracker";
import About from "./pages/About/About.jsx";

import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./theme/theme";

import './App.css';
import Orders from "./pages/Orders/Orders";

import axios from "axios"

axios.defaults.baseURL = "https://immense-retreat-89767.herokuapp.com/";
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <ThemeProvider theme={theme}>
                    <Route path={'/'} render={() => <Home />} exact />
                    <Route path={'/about'} render={() => <About />} exact />
                    <Route path={'/orders'} render={() => <Orders />} exact />
                    <Route path={'/shoptracker'} render={() => <ShopTracker />} exact />
                </ThemeProvider>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
