import useStyles from './styles.js'
import disable from '../../Global/disableUrl.js';
import OneRepMaxCalculator from '../../OneRepMaxCalculator/OneRepMaxCalculator.js';
import Login from '../../Login/Login.js';
import ForgotPassword from '../../Login/ForgotPassword/ForgotPassword.js';
import { useState } from 'react';
import Register from '../../Register/Register.js';
import CalorieCalculator from '../../CalorieCalculator/CalorieCalculator.js';

const LoggedOutHeader = () => {
    const classes = useStyles();
    const [showOneRMCalculator, setOneRMCalculator] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showCalorieCalculator, setShowCalorieCalculator] = useState(false);

    return (
        <div className="header">
            {showOneRMCalculator ? <OneRepMaxCalculator showOneRMCalculator={showOneRMCalculator} setOneRMCalculator={setOneRMCalculator} /> : null}
            {showLogin ? <Login showLogin={showLogin} setShowLogin={setShowLogin} setShowForgotPassword={setShowForgotPassword} /> : null}
            {showForgotPassword ? <ForgotPassword showForgotPassword={showForgotPassword} setShowForgotPassword={setShowForgotPassword} /> : null}
            {showRegister ? <Register showRegister={showRegister} setShowRegister={setShowRegister} /> : null}
            {showCalorieCalculator ? <CalorieCalculator showCalorieCalculator={showCalorieCalculator} setShowCalorieCalculator={setShowCalorieCalculator} /> : null}
            <div className="nav-wrapper">
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a className={"nav-link " + classes.signInOrUpUrls} href="#!" data-toggle="modal" data-target="#login-modal" onClick={(e) => {
                            e.preventDefault();
                            setShowLogin(true)
                        }}>
                            Sign In
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link " + classes.signInOrUpUrls} href="#!" data-toggle="modal" data-target="#register-modal" onClick={(e) => {
                            e.preventDefault();
                            setShowRegister(true)
                        }}>Sign Up</a>
                    </li>
                    <li className="nav-item dropdown dropleft">
                        <a className={"nav-link dropdown-toggle" + " " + classes.questionIcon + " " + classes.signInOrUpUrls} href="#!" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i className="far fa-question-circle"></i>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className={"dropdown-item " + classes.questionIconDropDown} href="#!">Opt1</a>
                            <a className={"dropdown-item " + classes.questionIconDropDown} href="#!">Opt2</a>
                        </div>
                    </li>

                </ul>
            </div>
            <div className={"nav-menu-wrapper " + classes.blackStripe}>
                <nav className={"navbar navbar-expand-lg " + classes.nav}>
                    <a className="navbar-brand" href="#!">
                        <img src="/UrGymBudLogoLight.png" alt="Logo" className={classes.logo}></img>
                    </a>
                    <button className={"navbar-toggler " + classes.navToggler} type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="bars-icon"><i className="fas fa-bars"></i></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i
                                    className="fas fa-hamburger"></i> <i className="fas fa-search"></i></a>
                            </li>
                            <li className="nav-item">
                                <a className={"nav-link " + classes.navUrls} href="#!" data-toggle="modal" data-target="#calorie-calculator" onClick={(e) => {
                                    e.preventDefault();
                                    setShowCalorieCalculator(true);
                                }}>Calorie Calculator</a>
                            </li>
                            <li className="nav-item">
                                <a className={"nav-link " + classes.navUrls} href="#!" data-toggle="modal" data-target="#one-rep-max-calculator" onClick={(e) => {
                                    e.preventDefault();
                                    setOneRMCalculator(true);
                                }}>1 Rep
                                    Max
                                    Calculator
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}


export default LoggedOutHeader;