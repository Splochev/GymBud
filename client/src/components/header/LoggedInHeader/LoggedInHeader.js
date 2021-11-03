import useStyles from './styles.js'
import disable from '../../Global/disableUrl';
import OneRepMaxCalculator from '../../OneRepMaxCalculator/OneRepMaxCalculator.js';
import { useState } from 'react';
import AddFood from '../../AddFood/AddFood.js';
import CalorieCalculator from '../../CalorieCalculator/CalorieCalculator.js';

const LoggedInHeader = () => {
    const classes = useStyles();
    const [showOneRMCalculator, setOneRMCalculator] = useState(false);
    const [showAddFood, setAddFood] = useState(false);
    const [showCalorieCalculator, setShowCalorieCalculator] = useState(false);

    return (
        <div className="header">
            {showOneRMCalculator ? <OneRepMaxCalculator showOneRMCalculator={showOneRMCalculator} setOneRMCalculator={setOneRMCalculator} /> : null}
            {showAddFood ? <AddFood showAddFood={showAddFood} setAddFood={setAddFood} /> : null}
            {showCalorieCalculator ? <CalorieCalculator showCalorieCalculator={showCalorieCalculator} setShowCalorieCalculator={setShowCalorieCalculator} /> : null}
            <div className="nav-wrapper">
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a className={"nav-link " + classes.signInOrUpUrls} href="#!">My Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link " + classes.signInOrUpUrls} href="#!">Logout</a>
                    </li>
                    <li className="nav-item dropdown dropleft">
                        <a className={"nav-link dropdown-toggle" + " " + classes.questionIcon + " " + classes.signInOrUpUrls} href="#!" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="far fa-question-circle"></i>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className={"dropdown-item " + classes.dropDown} href="#!">Opt1</a>
                            <a className={"dropdown-item " + classes.dropDown} href="#!">Opt2</a>
                        </div>
                    </li>
                </ul>
            </div>

            <div className={"nav-menu-wrapper " + classes.blackStripe}>
                <nav className={"navbar navbar-expand-lg " + classes.nav}>
                    <a className="navbar-brand" href="#!">
                        <img src="/UrGymBudLogoLight.png" alt="Logo" className={classes.logo}></img>
                    </a>
                    <button className={"navbar-toggler " + classes.navToggler} type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="bars-icon"><i className="fas fa-bars"></i> </span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item">
                                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                                ><i className="fas fa-hamburger"></i> <i className="fas fa-search"></i></a>
                            </li>
                            <li className="nav-item">
                                <a className={"nav-link " + classes.navUrls} href="#!" data-toggle="modal" data-target="#meal-planner">Meal Planner
                                    <span className={"badge badge-pill badge-secondary " + classes.addedFoodCounter}>0</span></a>
                            </li>
                            <li className="nav-item">
                                <a className={"nav-link " + classes.navUrls} href="#!">Progress-Tracker</a>
                            </li>

                            <li className="nav-item">
                                <a className={"nav-link " + classes.navUrls} href="#!" data-toggle="modal" data-target="#calorie-calculator" onClick={(e) => {
                                    e.preventDefault();
                                    setShowCalorieCalculator(true);
                                }}
                                >Calorie
                                    Calculator</a>
                            </li>
                            <li className="nav-item">
                                <a className={"nav-link " + classes.navUrls} href="#!" data-toggle="modal" data-target="#one-rep-max-calculator" onClick={(e) => {
                                    e.preventDefault();
                                    setOneRMCalculator(true);
                                }}>
                                    1 Rep
                                    Max
                                    Calculator
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className={"nav-link dropdown-toggle " + classes.navUrls} href="#!" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Food
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className={"dropdown-item " + classes.dropDown} href="#!">My Food</a>
                                    <a className={"dropdown-item " + classes.dropDown} href="#!" data-toggle="modal" data-target="#add-food"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setAddFood(true);
                                        }}>
                                        Add Food
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className={"nav-link dropdown-toggle " + classes.navUrls} href="#!" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Meals
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className={"dropdown-item " + classes.dropDown} href="#!">My Meals</a>
                                    <a className={"dropdown-item " + classes.dropDown} href="#!">My Meal Plans</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className={"nav-link dropdown-toggle " + classes.navUrls} href="#!" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Workout Journal
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className={"dropdown-item " + classes.dropDown} href="#!">My Workout Journal</a>
                                    <a className={"dropdown-item " + classes.dropDown} href="#!">Create A Workout Journal</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default LoggedInHeader;