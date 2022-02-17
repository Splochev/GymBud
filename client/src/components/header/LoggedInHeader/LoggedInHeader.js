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
import { IconButton, makeStyles } from '@material-ui/core';
import TrackWeight from '../../TrackWeight/TrackWeight.js';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Avatar, MenuList, Popover } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useWindowSize from '../../utils/useWindowSize.js';

const useStyles = makeStyles((theme) => ({
    nav: {
        backgroundColor: "#343a40",
        padding: 0,
        paddingLeft: '10px',
    },
    logo: {
        height: '42px',
    },
    active: {
        color: '#28A745 !important',
        borderBottom: '2px solid #28A745 !important',
        '& .MuiSvgIcon-root': {
            color: '#28A745 !important',
        },
    },
    shrinkUrl: {
        width: '143px'
    },
    shrinkNav: {
        paddingBottom: '10px'
    },
    navUrls: {
        fontSize: '20px',
        color: 'white',
        height: '100%',
        borderBottom: '2px solid #343A40',
        '&:hover': {
            color: '#1E7E34 !important',
            borderBottom: '2px solid #1E7E34 !important',
            '& .MuiSvgIcon-root': {
                color: '#1E7E34 !important',
            },
        }
    },
    navToggler: {
        color: 'white'
    },
    addedFoodCounter: {
        fontSize: '12px',
        verticalAlign: 'text-top',
        marginLeft: '5px'
    },
    usersAndMore: {
        '& .MuiButtonBase-root': {
            padding: 0
        }
    },
    avatarRoot: {
        '& .MuiAvatar-root': {
            color: 'white',
            border: '1px solid white',
            background: '#343A40',
        },
        '&:hover': {
            '& .MuiAvatar-root': {
                color: '#343A40',
                background: 'white'
            },
        }
    }
}));

const LoggedInHeader = ({ refreshTableData, setRefreshTableData }) => {
    const styles = useStyles();
    const [showOneRMCalculator, setShowOneRMCalculator] = useState(false);
    const [showAddFood, setShowAddFood] = useState(false);
    const [showCalorieCalculator, setShowCalorieCalculator] = useState(false);
    const [showTrackWeight, setShowTrackWeight] = useState(false);
    const { tab } = useQuery()
    const history = useHistory();
    const [anchorWorkout, setAnchorWorkout] = useState(null);
    const [anchorMeals, setAnchorMeals] = useState(null);
    const [anchorFood, setAnchorFood] = useState(null);
    const [anchorCalculators, setAnchorCalculators] = useState(null);



    const size = useWindowSize();

    useEffect(() => {
        if (size.width <= 991) {
            console.log('in')
        }
    }, [size])

    useEffect(() => {

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
            case 'track-weight':
                setShowTrackWeight(true);
                break;
            default:
                setShowCalorieCalculator(false);
                setShowOneRMCalculator(false);
                setShowAddFood(false);
                setShowTrackWeight(false);
                break;
        }
    }, [tab])

    return (
        <>
            <UGBModal
                open={showTrackWeight}
                onClose={() => {
                    history.push(window.location.pathname);
                    setShowTrackWeight(false)
                }}
                maxWidth='xs'
            >
                <TrackWeight
                    refreshTableData={refreshTableData}
                    setRefreshTableData={setRefreshTableData}
                    onClose={() => {
                        history.push(window.location.pathname);
                        setShowTrackWeight(false)
                    }}
                />
            </UGBModal>
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
            <nav className={clsx("navbar navbar-expand-xl", styles.nav)}>
                {size.width >= 1200 ?
                    <a
                        className="navbar-brand"
                        href="#!"
                        onClick={(e) => {
                            e.preventDefault();
                            history.push('/home');
                        }}
                    >
                        <img src="/UrGymBudLogoLight.png" alt="Logo" className={styles.logo}></img>
                    </a>
                    :
                    <div style={{ display: 'flex', gap: 10 }}>
                        <a
                            className="navbar-brand"
                            href="#!"
                            onClick={(e) => {
                                e.preventDefault();
                                history.push('/home');
                            }}
                        >
                            <img src="/UrGymBudLogoLight.png" alt="Logo" className={styles.logo}></img>
                        </a>
                        < UserAndMore />
                    </div>
                }
                <button
                    className={clsx("navbar-toggler", styles.navToggler)}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                >
                    <i className="fas fa-bars" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className={clsx("navbar-nav mr-auto", size.width < 1200 ? styles.shrinkNav : null)}>
                        <li className="nav-item">
                            <a className={clsx("nav-link", styles.navUrls, size.width < 1200 ? styles.shrinkUrl : null)}
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                Find Food
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={clsx("nav-link", styles.navUrls, size.width < 1200 ? styles.shrinkUrl : null)}
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                Meal Planner
                                <span className={clsx("badge badge-pill badge-secondary", styles.addedFoodCounter)}>
                                    0
                                </span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={clsx("nav-link",
                                    styles.navUrls,
                                    (history.location.pathname === '/progress' && !tab && !anchorCalculators && !anchorFood && !anchorMeals && !anchorWorkout) || tab === 'track-weight' ? styles.active : null,
                                    size.width < 1200 ? styles.shrinkUrl : null
                                )}
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push('/progress');
                                }}
                            >
                                Progress
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={clsx(
                                    "nav-link",
                                    styles.navUrls,
                                    anchorCalculators || tab === 'calorie-calculator' || tab === 'one-rep-max-calculator' ? styles.active : null,
                                    size.width < 1200 ? styles.shrinkUrl : null)}
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAnchorCalculators(e.currentTarget)
                                }}
                            >
                                Calculators
                                <ArrowDropDown style={{ color: '#FFFFFF' }} />
                            </a>
                            <Popover
                                anchorEl={anchorCalculators}
                                keepMounted
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorCalculators)}
                                onClose={() => setAnchorCalculators(null)}
                            >
                                <MenuList>
                                    <MenuItem>
                                        <Link
                                            component={NavLink}
                                            exact={true}
                                            to={'?tab=calorie-calculator'}
                                            onClick={() => setAnchorCalculators(null)}
                                        >
                                            Calorie Calculator
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            component={NavLink}
                                            exact={true}
                                            to={'?tab=one-rep-max-calculator'}
                                            onClick={() => setAnchorCalculators(null)}
                                        >
                                            1 Rep Max Calculator
                                        </Link>
                                    </MenuItem>
                                </MenuList>
                            </Popover>
                        </li>
                        <li className="nav-item">
                            <a
                                className={clsx(
                                    "nav-link",
                                    styles.navUrls,
                                    anchorFood || tab === 'add-food' ? styles.active : null,
                                    size.width < 1200 ? styles.shrinkUrl : null)}
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAnchorFood(e.currentTarget)
                                }}
                            >
                                Food
                                <ArrowDropDown style={{ color: '#FFFFFF' }} />
                            </a>
                            <Popover
                                anchorEl={anchorFood}
                                keepMounted
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorFood)}
                                onClose={() => setAnchorFood(null)}
                            >
                                <MenuList>
                                    <MenuItem>
                                        <Link
                                            component={NavLink}
                                            exact={true}
                                            to={'/home'}
                                        >
                                            My Food
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            component={NavLink}
                                            exact={true}
                                            to={'?tab=add-food'}
                                            onClick={() => setAnchorFood(null)}
                                        >
                                            Add Food
                                        </Link>
                                    </MenuItem>
                                </MenuList>
                            </Popover>
                        </li>
                        <li className="nav-item">
                            <a
                                className={clsx("nav-link", styles.navUrls, anchorMeals ? styles.active : null, size.width < 1200 ? styles.shrinkUrl : null)}
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAnchorMeals(e.currentTarget)
                                }}
                            >
                                Meals
                                <ArrowDropDown style={{ color: '#FFFFFF' }} />
                            </a>
                            <Popover
                                anchorEl={anchorMeals}
                                keepMounted
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorMeals)}
                                onClose={() => setAnchorMeals(null)}
                            >
                                <MenuList>
                                    <MenuItem>
                                        <Link
                                            component={NavLink}
                                            exact={true}
                                            to={'/home'}
                                        >
                                            My Meals
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            component={NavLink}
                                            exact={true}
                                            to={'/home'}
                                        >
                                            My Meal Plans
                                        </Link>
                                    </MenuItem>
                                </MenuList>
                            </Popover>
                        </li>
                        <li className="nav-item">
                            <a
                                className={clsx("nav-link", styles.navUrls, anchorWorkout ? styles.active : null, size.width < 1200 ? styles.shrinkUrl : null)}
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAnchorWorkout(e.currentTarget)
                                }}
                            >
                                Workout
                                <ArrowDropDown style={{ color: '#FFFFFF' }} />
                            </a>
                            <Popover
                                anchorEl={anchorWorkout}
                                keepMounted
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorWorkout)}
                                onClose={() => setAnchorWorkout(null)}
                            >
                                <MenuList>
                                    <MenuItem>
                                        <Link
                                            component={NavLink}
                                            exact={true}
                                            to={'/home'}
                                        >
                                            Workout Journal
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            component={NavLink}
                                            exact={true}
                                            to={'/home'}
                                        >
                                            Add Workout Journal
                                        </Link>
                                    </MenuItem>
                                </MenuList>
                            </Popover>
                        </li>
                    </ul>
                    {size.width >= 1200 ?
                        < UserAndMore />
                        :
                        null
                    }
                </div>
            </nav>
        </ >
    );
}

const UserAndMore = () => {
    const styles = useStyles();
    const [anchorUser, setAnchorUser] = useState(null);
    const [anchorMore, setAnchorMore] = useState(null);
    const store = useStoreContext();

    function onLogout(e) {
        e.preventDefault()
        postData(process.env.REACT_APP_HOST + '/api/user/logout')
            .then(data => {
                store[1](state => (state.user = undefined, { ...state }));
            }, error => {
                console.log('LOGOUT ERROR--->', error)
            })
    }


    return (
        <ul className={clsx("nav justify-content-end", styles.usersAndMore)}>
            <Button
                className={styles.avatarRoot}
                onClick={(e) => setAnchorUser(e.currentTarget)}
                component="span" disableTouchRipple
            >
                <Avatar>{store[0].user.first_name.charAt(0) + store[0].user.last_name.charAt(0)}</Avatar>
                <ArrowDropDown style={{ color: '#FFFFFF' }} />
            </Button>
            <Popover
                anchorEl={anchorUser}
                keepMounted
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={Boolean(anchorUser)}
                onClose={() => setAnchorUser(null)}
            >
                <MenuList>
                    <MenuItem>
                        <Link
                            component={NavLink}
                            exact={true}
                            to={'/home'}
                        >
                            My user
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link onClick={onLogout}>Logout</Link>
                    </MenuItem>
                </MenuList>
            </Popover>
            <IconButton
                onClick={(e) => setAnchorMore(e.currentTarget)}
                component="span" disableTouchRipple
            >
                <MoreVertIcon fontSize='large' style={{ color: 'white' }} />
            </IconButton>
            <Popover
                anchorEl={anchorMore}
                keepMounted
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={Boolean(anchorMore)}
                onClose={() => setAnchorMore(null)}
            >
                <MenuList>
                    <MenuItem>
                        <Link
                            component={NavLink}
                            exact={true}
                            to={'/home'}
                        >
                            Opt1
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            component={NavLink}
                            exact={true}
                            to={'/home'}
                        >
                            Opt1
                        </Link>
                    </MenuItem>
                </MenuList>
            </Popover>
        </ul>
    );
}

export default LoggedInHeader;