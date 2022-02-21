import { IconButton, makeStyles } from '@material-ui/core';
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
import useWindowSize from '../../utils/useWindowSize.js';
import UGBLogo from '../../Global/UGBLogo.js';
import UGBButton from '../../Global/UGBButton.js';
import LiItem from '../../Global/UGBLiItem.js';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    nav: {
        backgroundColor: "#1B1B1B",
        padding: 0,
        paddingLeft: '10px',
    },
    shrinkNav: {
        paddingBottom: '10px'
    },
    auth: {
        '& .MuiButtonBase-root': {
            padding: 0
        },
        alignItems: 'center'
    },
    logoContainer: {
        display: 'flex',
        gap: 10,
        alignItems: 'center'
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
            </>
            <nav className={clsx("navbar navbar-expand-custom", styles.nav)}>
                <div className={size.width < 970 ? styles.logoContainer : null}>
                    <UGBLogo />
                    {size.width < 970 ?
                        < Auth />
                        :
                        null
                    }
                </div>
                <UGBButton
                    btnType='toggler'
                    icon='fas fa-bars'
                    dataTarget='#navbarSupportedContent'
                />
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className={clsx("navbar-nav mr-auto", size.width < 970 ? styles.shrinkNav : null)}>
                        <LiItem >Find Food</LiItem>
                        <LiItem
                            path='?tab=calorie-calculator'
                            active={tab === 'calorie-calculator'}
                        >
                            Calorie Calculator
                        </LiItem>
                        <LiItem
                            path='?tab=one-rep-max-calculator'
                            active={tab === 'one-rep-max-calculator'}
                        >
                            1 Rep Max Calculator
                        </LiItem>
                    </ul>
                    {size.width >= 970 ?
                        < Auth />
                        :
                        null
                    }
                </div>
            </nav>
        </>
    );
}

const Auth = () => {
    const styles = useStyles();
    const { tab } = useQuery();
    const [anchorMore, setAnchorMore] = useState(null);
    const [moreSelectItems] = useState([{ label: 'Opt1', path: '/home' }, { label: 'Opt2', path: '/home' }])

    return (
        <div className={clsx("nav justify-content-end", styles.auth)}>
            <LiItem
                path='?tab=sign-in'
                active={tab === 'sign-in' || tab === 'forgotten-password'}
                shrinkUrl={false}
            >
                Sign In
            </LiItem>
            <LiItem
                path='?tab=sign-up'
                active={tab === 'sign-up'}
                shrinkUrl={false}
            >
                Sign Up
            </LiItem>
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
                    <MoreVertIcon fontSize='large' style={{ color: 'white' }} />
                </IconButton>
            </LiItem>
        </div>
    );
}


export default LoggedOutHeader;