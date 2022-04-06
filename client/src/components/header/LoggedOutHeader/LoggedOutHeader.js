import { IconButton, makeStyles } from '@material-ui/core';
import OneRepMaxCalculator from '../../OneRepMaxCalculator/OneRepMaxCalculator.js';
import Login from '../../Login/Login.js';
import ForgotPassword from '../../Login/ForgotPassword/ForgotPassword.js';
import { useState } from 'react';
import Register from '../../Register/Register.js';
import CalorieCalculator from '../../CalorieCalculator/CalorieCalculator.js';
import UGBModal from '../../Global/UGBModal.js';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '../../utils/RouteUtils.js';
import useWindowSize from '../../utils/useWindowSize.js';
import UGBLogo from '../../Global/UGBLogo.js';
import LiItem from '../../Global/UGBLiItem.js';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import { UGBButton } from '../../Global/UGBButton.js';

const useStyles = makeStyles((theme) => ({
    logoContainer: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    authLinks: {
        height: '100%',
        width: theme.spacing(17.5),
        display: 'flex',
        gap: theme.spacing(1),
        alignItems: 'center',
        '@media (max-width: 418px)': {
            gap: 0,
            flexDirection: 'column',
            alignItems: 'start',
        }
    },
    btnContainer: {
        '@media (max-width: 970px)': {
            width: theme.spacing(21.875)
        },
        '@media (max-width: 418px)': {
            width: theme.spacing(13)
        }
    },
    navigationBar: {
        backgroundColor: "#1B1B1B",
        padding: 0,
        display: 'flex',
        borderBottom: '2px solid transparent'
    },
    auth: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        '& .MuiButtonBase-root': {
            padding: 0
        },
        '@media (max-width: 418px)': {
            width: theme.spacing(13),
        }
    },
    navItems: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
        height: '100%'
    },
    navItemsContainer: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between'
    },
    collapsed: {
        height: '0px',
    },
    collapseNav: {
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#1B1B1B",
        gap: theme.spacing(1.25),
        transition: 'height 0.2s'
    },
    collapseNavTransition: {
        overflow: 'unset',
        paddingBottom: theme.spacing(1.25),
        paddingLeft: theme.spacing(1.25),
    },
    iconColor: {
        color: '#FFFFFF'
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
    const size = useWindowSize();
    const [toggleNav, setToggleNav] = useState(false)

    useEffect(() => {
        if (size.width >= 970) {
            setToggleNav(false)
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
                setShowCalorieCalculator(false);
                setShowOneRMCalculator(false);
                setShowLogin(false);
                setShowRegister(false);
                setShowForgotPassword(false);
                break;
        }
    }, [tab])

    return (
        <>
            <>
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
                    <Register />
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
            </>
            <div className={styles.navigationBar}>
                <div className={size.width < 970 ? styles.logoContainer : null}>
                    {size.width < 970 ?
                        <div className={styles.btnContainer}>
                            <UGBButton
                                variant='text'
                                onClick={() => setToggleNav(!toggleNav)}
                            >
                                <i className={clsx('fas fa-bars', styles.icon)} />
                            </UGBButton>
                        </div>
                        :
                        null
                    }
                    <UGBLogo setToggleNav={setToggleNav} />
                    {size.width < 970 ?
                        < Auth setToggleNav={setToggleNav} />
                        :
                        null
                    }
                </div>
                {size.width >= 970 ?
                    <div className={styles.navItemsContainer}>
                        <div className={styles.navItems}>
                            <NavItems setToggleNav={setToggleNav} />
                        </div>
                        < Auth setToggleNav={setToggleNav} />
                    </div>
                    :
                    null
                }
            </div>
            <div className={clsx(styles.collapseNav, size.width < 970 && toggleNav ? styles.collapseNavTransition : styles.collapsed)}>
                <NavItems setToggleNav={setToggleNav} />
            </div>
        </>
    );
}

const Auth = ({ setToggleNav }) => {
    const styles = useStyles();
    const { tab } = useQuery();
    const [anchorMore, setAnchorMore] = useState(null);
    const [moreSelectItems] = useState([{ label: 'Opt1', path: '/home', setToggleNav: setToggleNav }, { label: 'Opt2', path: '/home', setToggleNav: setToggleNav }])

    return (
        <div className={styles.auth}>
            <div className={styles.authLinks}>
                <LiItem
                    path='?tab=sign-in'
                    active={tab === 'sign-in' || tab === 'forgotten-password'}
                    shrinkUrl={false}
                    setToggleNav={setToggleNav}
                >
                    Sign In
                </LiItem>
                <LiItem
                    path='?tab=sign-up'
                    active={tab === 'sign-up'}
                    shrinkUrl={false}
                    setToggleNav={setToggleNav}
                >
                    Sign Up
                </LiItem>
            </div>
            <LiItem
                type='select'
                anchor={anchorMore}
                setAnchor={setAnchorMore}
                menuItems={moreSelectItems}
                customLabel={true}
                shrinkUrl={false}
            >
                <IconButton
                    onClick={(e) => setAnchorMore(e.currentTarget)}
                    component="span" disableTouchRipple
                >
                    <MoreVertIcon fontSize='large' className={styles.iconColor} />
                </IconButton>
            </LiItem>
        </div>
    );
}

const NavItems = ({ setToggleNav }) => {
    const size = useWindowSize();
    const { tab } = useQuery();

    return (
        <>
            <LiItem
                shrinkUrl={size.width < 970}
                customShrinkUrl={size.width < 970 ? '190px' : null}
                setToggleNav={setToggleNav}
            >
                Find Food
            </LiItem>
            <LiItem
                path='?tab=calorie-calculator'
                active={tab === 'calorie-calculator'}
                shrinkUrl={size.width < 970}
                customShrinkUrl={size.width < 970 ? '190px' : null}
                setToggleNav={setToggleNav}
            >
                Calorie Calculator
            </LiItem>
            <LiItem
                path='?tab=one-rep-max-calculator'
                active={tab === 'one-rep-max-calculator'}
                shrinkUrl={size.width < 970}
                customShrinkUrl={size.width < 970 ? '190px' : null}
                setToggleNav={setToggleNav}
            >
                1 Rep Max Calculator
            </LiItem>
        </>
    );
}

export default LoggedOutHeader;