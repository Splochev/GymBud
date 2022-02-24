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
import { Avatar } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useWindowSize from '../../utils/useWindowSize.js';
import UGBLogo from '../../Global/UGBLogo.js';
import UGBButton from '../../Global/UGBButton.js';
import LiItem from '../../Global/UGBLiItem.js';

const useStyles = makeStyles((theme) => ({
    usersAndMore: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '& .MuiButtonBase-root': {
            padding: 0
        }
    },
    avatarRoot: {
        '&:focus': {
            '& .MuiAvatar-root': {
                boxShadow: '#969A9D 0px 0px 0px 3px',
            },
        },
        '& .MuiAvatar-root': {
            color: 'white',
            border: '1px solid white',
            background: '#1B1B1B',
        },
        '&:hover': {
            '& .MuiAvatar-root': {
                color: '#1B1B1B',
                background: 'white'
            },
        }
    },
    avatarFocused: {
        '& .MuiAvatar-root': {
            color: '#1B1B1B',
            background: 'white',
            boxShadow: '#969A9D 0px 0px 0px 3px',
        },
    },
    logoContainer: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    authLinks: {
        height: '100%',
        width: '140px',
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        '@media (max-width: 418px)': {
            gap: 0,
            flexDirection: 'column',
            alignItems: 'start',
        }
    },
    btnContainer: {
        '@media (max-width: 970px)': {
            width: '101px',
        },
        '@media (max-width: 418px)': {
            width: '104px',
        }
    },
    navigationBar: {
        backgroundColor: "#1B1B1B",
        padding: 0,
        display: 'flex',
        border: '2px solid #1B1B1B'
    },
    navItems: {
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        height: '100%'
    },
    navItemsContainer: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between'
    },
    collapseNav: {
        height: '0px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#1B1B1B",
        gap: 10,
        transition: 'height 0.1s'
    },
    collapseNavTransition: {
        height: '250px',
        paddingBottom: 10,
        paddingLeft: 10,
    }
}));


const LoggedInHeader = ({ refreshTableData, setRefreshTableData }) => {
    const styles = useStyles();
    const size = useWindowSize();
    const history = useHistory();
    const { tab } = useQuery();
    const [showOneRMCalculator, setShowOneRMCalculator] = useState(false);
    const [showAddFood, setShowAddFood] = useState(false);
    const [showCalorieCalculator, setShowCalorieCalculator] = useState(false);
    const [showTrackWeight, setShowTrackWeight] = useState(false);

    const [toggleNav, setToggleNav] = useState(size.width < 970)

    useEffect(() => {
        if (size.width < 970) {
            setToggleNav(false);
        } else {
            setToggleNav(true);
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
            </>
            <div className={styles.navigationBar}>
                <div className={size.width < 970 ? styles.logoContainer : null}>
                    {size.width < 970 ?
                        <div className={styles.btnContainer}>
                            <UGBButton
                                icon='fas fa-bars'
                                onClick={() => setToggleNav(!toggleNav)}
                            />
                        </div>
                        :
                        null
                    }
                    <UGBLogo />
                    {size.width < 970 ?
                        < UserAndMore />
                        :
                        null
                    }
                </div>
                {size.width >= 970 ?
                    <div className={styles.navItemsContainer}>
                        <div className={styles.navItems}>
                            <NavItems />
                        </div>
                        < UserAndMore />

                    </div>
                    :
                    null
                }
            </div>
            <div className={clsx(styles.collapseNav, size.width < 970 && toggleNav ? styles.collapseNavTransition : '')}>
                {size.width < 970 && toggleNav ?
                    <NavItems />
                    :
                    null
                }
            </div>
        </ >
    );
}

const UserAndMore = () => {
    const styles = useStyles();
    const store = useStoreContext();
    const [anchorUser, setAnchorUser] = useState(null);
    const [anchorMore, setAnchorMore] = useState(null);
    const [userSelectItems] = useState([{ label: 'My user', path: '/home' }, { label: 'Logout', path: null, onClick: onLogout }])
    const [moreSelectItems] = useState([{ label: 'Opt1', path: '/home' }, { label: 'Opt2', path: '/home' }])

    function onLogout() {
        setAnchorUser(null);
        postData(process.env.REACT_APP_HOST + '/api/user/logout')
            .then(data => {
                store[1](state => (state.user = undefined, { ...state }));
            }, error => {
                console.log('LOGOUT ERROR--->', error)
            })
    }

    return (
        <div className={styles.usersAndMore}>
            <LiItem
                type='select'
                anchor={anchorUser}
                setAnchor={setAnchorUser}
                menuItems={userSelectItems}
                customLabel={true}
            >
                <Button
                    className={clsx(styles.avatarRoot, anchorUser ? styles.avatarFocused : null)}
                    onClick={(e) => setAnchorUser(e.currentTarget)}
                    component="span" disableTouchRipple
                >
                    <Avatar>{store[0].user.first_name.charAt(0) + store[0].user.last_name.charAt(0)}</Avatar>
                    <ArrowDropDown style={{ color: '#FFFFFF' }} />
                </Button>
            </LiItem>
            <LiItem
                type='select'
                anchor={anchorMore}
                setAnchor={setAnchorMore}
                menuItems={moreSelectItems}
                customLabel={true}
            >
                <IconButton
                    onClick={(e) => setAnchorMore(e.currentTarget)}
                    component="span" disableTouchRipple
                >
                    <MoreVertIcon fontSize='large' style={{ color: 'white' }} />
                </IconButton>
            </LiItem>
        </div>
    );
}

const NavItems = () => {
    const { tab } = useQuery();
    const [anchorWorkout, setAnchorWorkout] = useState(null);
    const [anchorMeals, setAnchorMeals] = useState(null);
    const [anchorFood, setAnchorFood] = useState(null);
    const [anchorCalculators, setAnchorCalculators] = useState(null);
    const [calculatorSelectItems] = useState([{ label: 'Calorie Calculator', path: '?tab=calorie-calculator' }, { label: '1 Rep Max Calculator', path: '?tab=one-rep-max-calculator' }])
    const [foodSelectItems] = useState([{ label: 'My Food', path: '/home' }, { label: 'Add Food', path: '?tab=add-food' }])
    const [mealsSelectItems] = useState([{ label: 'My Meals', path: '/home' }, { label: 'My Meal Plans', path: '/home' }])
    const [workoutSelectItems] = useState([{ label: 'Workout Journal', path: '/home' }, { label: 'Add Workout Journal', path: '/home' }])
    const history = useHistory();

    return (
        <>
            <LiItem >Find Food</LiItem>
            <LiItem badgeCount={1}>Meal Planner</LiItem>
            <LiItem
                path='/progress'
                active={(history.location.pathname === '/progress' && !tab && !anchorCalculators && !anchorFood && !anchorMeals && !anchorWorkout) || tab === 'track-weight'}
            >
                Progress
            </LiItem>
            <LiItem
                type='select'
                anchor={anchorCalculators}
                setAnchor={setAnchorCalculators}
                menuItems={calculatorSelectItems}
                active={anchorCalculators || tab === 'calorie-calculator' || tab === 'one-rep-max-calculator' ? true : null}
            >
                Calculators
            </LiItem>
            <LiItem
                type='select'
                anchor={anchorFood}
                setAnchor={setAnchorFood}
                menuItems={foodSelectItems}
                active={anchorFood || tab === 'add-food' ? true : null}
            >
                Food
            </LiItem>
            <LiItem
                type='select'
                anchor={anchorMeals}
                setAnchor={setAnchorMeals}
                menuItems={mealsSelectItems}
                active={anchorMeals ? true : null}
            >
                Meals
            </LiItem>
            <LiItem
                type='select'
                anchor={anchorWorkout}
                setAnchor={setAnchorWorkout}
                menuItems={workoutSelectItems}
                active={anchorWorkout ? true : null}
            >
                Workout
            </LiItem>
        </>
    );
}

export default LoggedInHeader;



