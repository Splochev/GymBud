import useStyles from './styles.js'
import OneRepMaxCalculator from '../../OneRepMaxCalculator/OneRepMaxCalculator.js';
import Login from '../../Login/Login.js';
import ForgotPassword from '../../Login/ForgotPassword/ForgotPassword.js';
import { useState } from 'react';
import Register from '../../Register/Register.js';
import CalorieCalculator from '../../CalorieCalculator/CalorieCalculator.js';
import UGBModal from '../../Global/UGBModal.js';
import clsx from 'clsx'

const LoggedOutHeader = () => {
    const styles = useStyles();
    const [showOneRMCalculator, setOneRMCalculator] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showCalorieCalculator, setShowCalorieCalculator] = useState(false);

    return (
        <div className="header">
            <UGBModal
                open={showOneRMCalculator}
                onClose={() => setOneRMCalculator(false)}
                maxWidth='sm'
            >
                <OneRepMaxCalculator />
            </UGBModal>
            <UGBModal
                open={showCalorieCalculator}
                onClose={() => setShowCalorieCalculator(false)}
                maxWidth='sm'
            >
                <CalorieCalculator />
            </UGBModal>
            <UGBModal
                open={showRegister}
                onClose={() => setShowRegister(false)}
                maxWidth='sm'
            >
                <Register />
            </UGBModal>
            <UGBModal
                open={showLogin}
                onClose={() => setShowLogin(false)}
                maxWidth='sm'
            >
                <Login
                    setShowForgotPassword={setShowForgotPassword}
                    setShowLogin={setShowLogin}
                />
            </UGBModal>
            <UGBModal
                open={showForgotPassword}
                onClose={() => setShowForgotPassword(false)}
                maxWidth='sm'
            >
                <ForgotPassword />
            </UGBModal>

            <div className="nav-wrapper">
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a className={clsx("nav-link", styles.signInOrUpUrls)} href="#!" data-toggle="modal" data-target="#login-modal" onClick={(e) => {
                            e.preventDefault();
                            setShowLogin(true)
                        }}>
                            Sign In
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={clsx("nav-link", styles.signInOrUpUrls)} href="#!" onClick={(e) => {
                            e.preventDefault();
                            setShowRegister(true)
                        }}>Sign Up</a>
                    </li>
                    <li className="nav-item dropdown dropleft">
                        <a className={clsx('nav-link dropdown-toggle', styles.questionIcon, styles.signInOrUpUrls)} href="#!" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i className="far fa-question-circle"></i>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className={clsx("dropdown-item", styles.questionIconDropDown)} href="#!">Opt1</a>
                            <a className={clsx("dropdown-item", styles.questionIconDropDown)} href="#!">Opt2</a>
                        </div>
                    </li>

                </ul>
            </div>
            <div className={clsx("nav-menu-wrapper", styles.blackStripe)}>
                <nav className={clsx("navbar navbar-expand-lg ", styles.nav)}>
                    <a className="navbar-brand" href="#!">
                        <img src="/UrGymBudLogoLight.png" alt="Logo" className={styles.logo}></img>
                    </a>
                    <button className={clsx("navbar-toggler", styles.navToggler)} type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
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
                                <a className={"nav-link " + styles.navUrls} href="#!" onClick={(e) => {
                                    e.preventDefault();
                                    setShowCalorieCalculator(true);
                                }}>Calorie Calculator</a>
                            </li>
                            <li className="nav-item">
                                <a className={"nav-link " + styles.navUrls} href="#!" onClick={(e) => {
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