import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Home from './pages/Home/Home'
import ShopTracker from "./pages/ShopTracker/ShopTracker";
import About from "./pages/About/About";

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
    ].join(','),
  },});

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
            <ThemeProvider theme={theme}>
                <Route path={'/'} render={() => <Home />} exact />
                <Route path={'/about'} render={() => <About />} exact />
                <Route path={'/shoptracker'} render={() => <ShopTracker />} exact />
                </ThemeProvider>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
