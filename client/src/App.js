import React from "react";
import LoggedOutHeader from "./components/header/LoggedOutHeader/LoggedOutHeader"
import LoggedInHeader from "./components/header/LoggedInHeader/LoggedInHeader";
import HomePageArticles from "./components/HomePageArticles/HomePageArticles";
import Footer from "./components/Footer/Footer";
import { useState } from 'react';
import Store from './components/store/Store'
// import ProgressTracker from './components/ProgressTracker/ProgressTracker'

const App = () => {
    const [loggedIn, setLoggedIn] = useState(true);
    if (loggedIn) {
        return (
            <div className="app">
                <LoggedInHeader />
                <HomePageArticles />
                {/* <ProgressTracker /> */}
                <Footer />
            </div>
        )
    }
    return (
        <div className="app">
            <LoggedOutHeader />
            <HomePageArticles />
            <Footer />
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