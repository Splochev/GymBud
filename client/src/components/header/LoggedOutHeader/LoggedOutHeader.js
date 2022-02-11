import { makeStyles } from '@material-ui/core';
import OneRepMaxCalculator from '../../OneRepMaxCalculator/OneRepMaxCalculator.js';
import Login from '../../Login/Login.js';
import ForgotPassword from '../../Login/ForgotPassword/ForgotPassword.js';
import { useState } from 'react';
import Register from '../../Register/Register.js';
import CalorieCalculator from '../../CalorieCalculator/CalorieCalculator.js';
import UGBModal from '../../Global/UGBModal.js';
import clsx from 'clsx'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '../../utils/RouteUtils.js';

const useStyles = makeStyles((theme) => ({
    questionIcon: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    questionIconDropDown: {
        color: '#343a40',
        fontSize: '20px',
        '&:hover': {
            color: '#343a40',
            textDecoration: 'underline',
            backgroundColor: 'white'
        }
    },
    nav: {
        backgroundColor: "#343a40"
    },
    logo: {
        width: '50px'
    },
    navUrls: {
        fontSize: '20px',
        color: 'white',
        '&:hover': {
            color: 'white',
            textDecoration: 'underline'
        }
    },
    navToggler: {
        color: 'white'
    },
    blackStripe: {
        backgroundColor: 'black',
        paddingTop: '10px'
    }
}));


const LoggedOutHeader = () => {
    const styles = useStyles();
    const history = useHistory();
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showOneRMCalculator, setShowOneRMCalculator] = useState(false);
    const [showCalorieCalculator, setShowCalorieCalculator] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const { tab } = useQuery();

    useEffect(() => {
        if (tab) {
            switch (tab) {
                case 'calorie-calculator':
                    setShowCalorieCalculator(true);
                    break;
                case 'one-rep-max-calculator':
                    setShowOneRMCalculator(true);
                    break;
                case 'sign-in':
                    setShowLogin(true);
                    break;
                case 'sign-up':
                    setShowRegister(true);
                    break;
                case 'forgotten-password':
                    setShowForgotPassword(true);
                    break;
                default:
                    break;
            }
        }
    }, [tab])

    return (
        <div className={styles.blackStripe}>
            <UGBModal
                open={showOneRMCalculator}
                onClose={() => {
                    history.push(window.location.pathname);
                    setShowOneRMCalculator(false)
                }}
                maxWidth='sm'
            >
                <OneRepMaxCalculator />
            </UGBModal>
            <UGBModal
                open={showCalorieCalculator}
                onClose={() => {
                    history.push(window.location.pathname);
                    setShowCalorieCalculator(false)
                }}
                maxWidth='sm'
            >
                <CalorieCalculator />
            </UGBModal>
            <UGBModal
                open={showRegister}
                onClose={() => {
                    history.push(window.location.pathname);
                    setShowRegister(false)
                }}
                maxWidth='sm'
            >
                <Register onClose={() => setShowRegister(false)} />
            </UGBModal>
            <UGBModal
                open={showLogin}
                onClose={() => {
                    history.push(window.location.pathname);
                    setShowLogin(false)
                }}
                maxWidth='sm'
            >
                <Login
                    setShowForgotPassword={setShowForgotPassword}
                    setShowLogin={setShowLogin}
                />
            </UGBModal>
            <UGBModal
                open={showForgotPassword}
                onClose={() => {
                    history.push(window.location.pathname);
                    setShowForgotPassword(false)
                }}
                maxWidth='sm'
            >
                <ForgotPassword />
            </UGBModal>
            <nav className={clsx("navbar navbar-expand-lg", styles.nav)}>
                <a
                    className="navbar-brand"
                    href="#!"
                    onClick={(e) => {
                        e.preventDefault();
                        history.push('/home');
                    }}>
                    <img src="/UrGymBudLogoLight.png" alt="Logo" className={styles.logo}></img>
                </a>
                <button
                    className={clsx("navbar-toggler", styles.navToggler)}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                >
                    <i className="fas fa-bars" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                                <i className="fas fa-hamburger" /> <i className="fas fa-search" />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={clsx("nav-link", styles.navUrls)}
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push({ search: "?tab=calorie-calculator", state: { fromPopup: true } });
                                }}
                            >
                                Calorie Calculator
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={clsx("nav-link", styles.navUrls)}
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push({ search: "?tab=one-rep-max-calculator", state: { fromPopup: true } });
                                }}
                            >
                                1 Rep Max Calculator
                            </a>
                        </li>
                    </ul>
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <a
                                className={clsx("nav-link", styles.navUrls)}
                                href="#!"
                                data-toggle="modal"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push({ search: "?tab=sign-in", state: { fromPopup: true } });
                                }}
                            >
                                Sign In
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={clsx("nav-link", styles.navUrls)}
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push({ search: "?tab=sign-up", state: { fromPopup: true } });
                                }}
                            >
                                Sign Up
                            </a>
                        </li>
                        <li className="nav-item dropdown dropleft">
                            <a
                                className={clsx('nav-link dropdown-toggle', styles.questionIcon, styles.navUrls)}
                                href="#!"
                                role="button"
                                data-toggle="dropdown"
                            >
                                <i className="far fa-question-circle" />
                            </a>
                            <div className="dropdown-menu">
                                <a className={clsx("dropdown-item", styles.questionIconDropDown)} href="#!">Opt1</a>
                                <a className={clsx("dropdown-item", styles.questionIconDropDown)} href="#!">Opt2</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}


export default LoggedOutHeader;