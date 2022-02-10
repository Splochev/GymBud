import OneRepMaxCalculator from '../../OneRepMaxCalculator/OneRepMaxCalculator.js';
import { useState } from 'react';
import AddFood from '../../AddFood/AddFood.js';
import CalorieCalculator from '../../CalorieCalculator/CalorieCalculator.js';
import UGBModal from '../../Global/UGBModal.js';
import { useStoreContext } from '../../store/Store.js';
import clsx from 'clsx';
import { postData } from '../../utils/FetchUtils.js';
import { useHistory } from 'react-router-dom';
import { useQuery } from '../../utils/RouteUtils.js';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    questionIcon: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    signInOrUpUrls: {
        color: '#343a40',
        fontSize: '20px',
        '&:hover': {
            textDecoration: 'underline',
            color: '#007BFF'
        }
    },
    dropDown: {
        color: '#343a40',
        fontSize: '20px',
        '&:hover': {
            color: '#343a40',
            textDecoration: 'underline',
            backgroundColor: 'white'
        }
    },
    nav: {
        backgroundColor: "#343a40",
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
    },
    addedFoodCounter: {
        fontSize: '12px',
        verticalAlign: 'text-top',
        marginLeft: '5px'
    }
}));

const LoggedInHeader = () => {
    const styles = useStyles();
    const [store, setStore] = useStoreContext();
    const history = useHistory();
    const [showOneRMCalculator, setShowOneRMCalculator] = useState(false);
    const [showAddFood, setShowAddFood] = useState(false);
    const [showCalorieCalculator, setShowCalorieCalculator] = useState(false);
    const { tab } = useQuery()


    useEffect(() => {
        if (tab) {
            switch (tab) {
                case 'calorie-calculator':
                    setShowCalorieCalculator(true);
                    break;
                case 'one-rep-max-calculator':
                    setShowOneRMCalculator(true);
                    break;
                case 'add-food':
                    setShowAddFood(true);
                    break;
                default:
                    break;
            }
        }
    }, [tab])

    function onLogout(e) {
        e.preventDefault()
        postData(process.env.REACT_APP_HOST + '/api/user/logout')
            .then(data => {
                setStore(state => (state.user = undefined, { ...state }));
            }, error => {
                console.log('LOGOUT ERROR--->', error)
            })
    }

    return (
        <div className="header">
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
                open={showAddFood}
                onClose={() => {
                    history.push(window.location.pathname);
                    setShowAddFood(false)
                }}
                maxWidth='xs'
            >
                <AddFood />
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
            <div className="nav-wrapper">
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a className={clsx("nav-link", styles.signInOrUpUrls)} href="#!">My Profile</a>
                    </li>
                    <li className="nav-item" onClick={onLogout}>
                        <a className={clsx("nav-link", styles.signInOrUpUrls)} href="#!" onClick={onLogout}>Logout</a>
                    </li>
                    <li className="nav-item dropdown dropleft">
                        <a className={clsx('nav-link dropdown-toggle', styles.questionIcon, styles.signInOrUpUrls)} href="#!" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="far fa-question-circle" />
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className={clsx("dropdown-item", styles.dropDown)} href="#!">Opt1</a>
                            <a className={clsx("dropdown-item", styles.dropDown)} href="#!">Opt2</a>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={clsx("nav-menu-wrapper", styles.blackStripe)}>
                <nav className={clsx("navbar navbar-expand-lg", styles.nav)}>
                    <a className="navbar-brand" href="#!" onClick={(e) => {
                        e.preventDefault();
                        history.push('/home');
                    }}>
                        <img src="/UrGymBudLogoLight.png" alt="Logo" className={styles.logo}></img>
                    </a>
                    <button className={clsx("navbar-toggler", styles.navToggler)} type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="bars-icon"><i className="fas fa-bars" /> </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                                ><i className="fas fa-hamburger"></i> <i className="fas fa-search" /></a>
                            </li>
                            <li className="nav-item">
                                <a className={clsx("nav-link", styles.navUrls)} href="#!">Meal Planner
                                    <span className={clsx("badge badge-pill badge-secondary", styles.addedFoodCounter)}>0</span></a>
                            </li>
                            <li className="nav-item">
                                <a className={clsx("nav-link", styles.navUrls)} href="#!" onClick={(e) => {
                                    e.preventDefault();
                                    history.push('/progress-tracker');
                                }}>Progress-Tracker</a>
                            </li>

                            <li className="nav-item">
                                <a className={clsx("nav-link", styles.navUrls)} href="#!" onClick={(e) => {
                                    e.preventDefault();
                                    history.push({
                                        search: "?tab=calorie-calculator",
                                        state: { fromPopup: true }
                                    });

                                }}
                                >Calorie
                                    Calculator</a>
                            </li>
                            <li className="nav-item">
                                <a className={clsx("nav-link", styles.navUrls)} href="#!" onClick={(e) => {
                                    e.preventDefault();
                                    history.push({
                                        search: "?tab=one-rep-max-calculator",
                                        state: { fromPopup: true }
                                    });
                                }}>
                                    1 Rep
                                    Max
                                    Calculator
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className={clsx("nav-link dropdown-toggle", styles.navUrls)} href="#!" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Food
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className={clsx("dropdown-item", styles.dropDown)} href="#!">My Food</a>
                                    <a className={clsx("dropdown-item", styles.dropDown)} href="#!" onClick={(e) => {
                                        e.preventDefault();
                                        history.push({
                                            search: "?tab=add-food",
                                            state: { fromPopup: true }
                                        });
                                    }}>
                                        Add Food
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className={clsx("nav-link dropdown-toggle", styles.navUrls)} href="#!" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Meals
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className={clsx("dropdown-item", styles.dropDown)} href="#!">My Meals</a>
                                    <a className={clsx("dropdown-item", styles.dropDown)} href="#!">My Meal Plans</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className={clsx("nav-link dropdown-toggle", styles.navUrls)} href="#!" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Workout Journal
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className={clsx("dropdown-item", styles.dropDown)} href="#!">My Workout Journal</a>
                                    <a className={clsx("dropdown-item", styles.dropDown)} href="#!">Create A Workout Journal</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div >
    );
}

export default LoggedInHeader;