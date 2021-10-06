import React from "react";
import LoggedOutHeader from "./components/header/LoggedOutHeader/LoggedOutHeader"
import LoggedInHeader from "./components/header/LoggedInHeader/LoggedInHeader";
import HomePageArticles from "./components/HomePageArticles/HomePageArticles";
import AddFood from "./components/AddFood/AddFood";
import Footer from "./components/Footer/Footer";
import { useState } from 'react';
import CalorieCalculator from "./components/CalorieCalculator/CalorieCalculator";
import OneRepMaxCalculator from "./components/OneRepMaxCalculator/OneRepMaxCalculator";
import Login from "./components/Login/Login"
import Register from "./components/Register/Register";
import ForgotPassword from "./components/Login/ForgotPassword/ForgotPassword";
import Store from './store/Store'

const App = () => {
    const [loggedIn, setLoggedIn] = useState(true);
    if (loggedIn) {
        return (
            <div className="app">
                <LoggedInHeader />
                <HomePageArticles />
                <Footer />
                <CalorieCalculator />
                <OneRepMaxCalculator />
                <AddFood />
            </div>
        )
    }
    return (
        <div className="app">
            <LoggedOutHeader />
            <HomePageArticles />
            <Footer />
            <CalorieCalculator />
            <OneRepMaxCalculator />
            <Login />
            <Register />
            <ForgotPassword />
        </div>
    )

    // return (
    //     < Store >
    //         <div className="app">
    //             <LoggedOutHeader />
    //             <CalorieCalculator />
    //             <OneRepMaxCalculator />
    //             <Login />
    //             <Register />
    //             <ForgotPassword />
    //         </div>
    //     </Store >
    // )

}

export default App;