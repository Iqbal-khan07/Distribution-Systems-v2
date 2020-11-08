import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Home from './pages/Home/Home'
import ShopTracker from "./pages/ShopTracker/ShopTracker";

import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path={'/'} render={() => <Home />} exact />
                <Route path={'/shoptracker'} render={() => <ShopTracker />} exact />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
