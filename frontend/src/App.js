import React, {useCallback, useContext, useEffect, useState} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import Home from './pages/Home/Home'
import ShopTracker from "./pages/ShopTracker/ShopTracker";
import About from "./pages/About/About.jsx";
import SuperDashboard from "./pages/SuperDashboard/SuperDashboard";

import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./theme/theme";

import './App.css';
import Orders from "./pages/Orders/Orders";

import axios from "axios"
import OrderFulfillerDashboard from "./pages/OrderFulfillerDashboard/OrderFulfillerDashboard";
import {UserContext} from "./context/UserContext";
import {ORDER_FULFILLER, ORDER_TAKER, SUPER_USER} from "./constants/ROLES";
import OrderTakerDashboard from "./pages/OrderTakerDashboard/OrderTakerDashboard";

axios.defaults.baseURL = "https://arcane-scrubland-51912.herokuapp.com/api/";
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
    const { user, getUserFromLocalStorage, login } = useContext(UserContext);

    const chooseDashboard = (role) => {
        switch (role){
            case ORDER_FULFILLER:
                return <OrderFulfillerDashboard />
            case ORDER_TAKER:
                return <OrderTakerDashboard />
            case SUPER_USER:
                return <SuperDashboard />
            default:
                break
        }
    }

    useEffect(() => {
        const storedUser = getUserFromLocalStorage();
        if(storedUser){
            login(storedUser.id, storedUser.imageUrl, storedUser.name, storedUser.role)
        }
    }, [])

    let routes;
    if( user ){
        routes = (
            <>
                <Route path={'/dashboard'} render={() => chooseDashboard(user.role)} exact />
                <Route path={'/orders'} render={() => <Orders />} exact />
                <Route path={'/shoptracker'} render={() => <ShopTracker />} exact />
                <Redirect to="/dashboard" />
            </>
        );
    }else {
        routes = (
            <>
                <Route path={'/'} render={() => <Home />} exact />
                <Route path={'/about'} render={() => <About />} exact />
                <Redirect to="/" />
            </>
        )
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <ThemeProvider theme={theme}>
                        {routes}
                    </ThemeProvider>
                </Switch>
            </BrowserRouter>
        </div>
      );
}

export default App;
