import React, { useState, useEffect } from 'react';
import LoggedOutHeader from "./components/header/LoggedOutHeader/LoggedOutHeader"
import LoggedInHeader from "./components/header/LoggedInHeader/LoggedInHeader";
import HomePageArticles from "./components/HomePageArticles/HomePageArticles";
import Footer from "./components/Footer/Footer";
import { StoreContext, initialStoreState } from './components/store/Store';
import { Route, Redirect } from 'react-router';
import { Switch, BrowserRouter, useHistory } from 'react-router-dom';
import { getData } from './components/utils/FetchUtils'
import { useStoreContext } from './components/store/Store'
import { makeStyles } from '@material-ui/core/styles';
import WorkoutBuilder from './components/WorkoutBuilder/WorkoutBuilder';
import clsx from 'clsx';
import Progress from './components/Progress/ProgressLayout';
import SignIn from './components/SignIn/SignIn';
import CreateNewAccount from './components/CreateNewAccount/CreateNewAccount';
import ForgottenPassword from './components/ForgottenPassword/ForgottenPassword';
import VerifyRegistration from './components/Verify/Verify';
import ChangePassword from './components/ChangePassword/ChangePassword';
import {useLocationChange} from './components/utils/RouteUtils';
require("dotenv").config();

const AutoLoginComponent = ({ children }) => {
    const [state, setState] = useStoreContext();
    const history = useHistory();

    useLocationChange(() => {
        if (window.location.href.includes('www')) {
            const a = document.createElement('a');
            a.href = process.env.REACT_APP_HOST+'/home';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    })

    useEffect(() => {
        if (state.autoLoginLoading && state.returnUrl) {
            history.push(state.returnUrl);
            setState(state => (state.returnUrl = undefined, { ...state }))
        }
    }, [state.autoLoginLoading])


    return state.autoLoginLoading ?
        <></>
        :
        children
}

const useStyles = makeStyles((theme) => ({
    pageLayout: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    contentContainer: {
        height: '100%',
    },
    hasOverflow: {
        overflow: 'auto',
    }
}));

const App = () => {
    const styles = useStyles();
    const [storeState, setStoreState] = useState(initialStoreState);
    const [isFetchAttached, setIsFetchAttached] = useState(false);

    useEffect(() => {
        const originalFetch = window.fetch;
        window.fetch = function (input, init) {
            // console.log('fetch', input);
            return originalFetch(input, init)
                .then(async resp => {
                    if (!resp.ok) {
                        const text = await resp.text();

                        let parsedError = '';
                        try {
                            parsedError = JSON.parse(text).msg;
                        } catch {
                            parsedError = text;
                        }

                        switch (resp.status) {
                            case 401:
                                setStoreState(state => (state.user = undefined, { ...state }));
                                // $snackbarMessage.set(parsedError);
                                return;
                            default:
                                break;
                        }

                        throw new Error(parsedError);
                    }

                    // parses JSON response into native JavaScript objects
                    return resp.json()
                        .catch(err => console.error('response parse error', input, 'error', err));
                },
                    err => {
                        // if fetch throws an error
                        //   $snackbarMessage.set(err.message);
                        console.error('fetch error', err);
                    });
        }

        const location = window.location.pathname + (window.location.search || '')
        setStoreState(state => (state.returnUrl = location, state.autoLoginLoading = true, { ...state }))
        getData(process.env.REACT_APP_HOST + '/api/user/me')
            .then(data => {
                if (data) {
                    setStoreState(state => (state.user = data, state.autoLoginLoading = false, { ...state }));
                } else {
                    setStoreState(state => (state.autoLoginLoading = false, { ...state }));
                }
            })

        setIsFetchAttached(true);
        return () => {
            window.fetch = originalFetch;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        isFetchAttached ?
            <StoreContext.Provider value={[storeState, setStoreState]}>
                <BrowserRouter>
                    <AutoLoginComponent>
                        {storeState.user ?
                            <div className={styles.pageLayout}>
                                <LoggedInHeader />
                                <div className={clsx(styles.contentContainer, storeState.hasOverflow ? styles.hasOverflow : '')}>
                                    <Switch>
                                        <Route exact path="/home" component={HomePageArticles} />
                                        <Route exact path="/progress" component={Progress} />
                                        <Route exact path="/workout" component={WorkoutBuilder} />
                                        <Redirect from="*" to="/home" />
                                    </Switch>
                                </div>
                                <Footer />
                            </div>
                            :
                            <div className={styles.pageLayout}>
                                <LoggedOutHeader />
                                <div className={clsx(styles.contentContainer, storeState.hasOverflow ? styles.hasOverflow : '')}>
                                    <Switch>
                                        <Route exact path="/home" component={HomePageArticles} />
                                        <Route exact path="/sign-in" component={SignIn} />
                                        <Route exact path="/create-new-account" component={CreateNewAccount} />
                                        <Route exact path="/forgotten-password" component={ForgottenPassword} />
                                        <Route exact path="/verify" component={VerifyRegistration} />
                                        <Route exact path="/change-password" component={ChangePassword} />
                                        <Redirect from="*" to="/home" />
                                    </Switch>
                                </div>
                                <Footer />
                            </div>
                        }
                    </AutoLoginComponent>
                </BrowserRouter>
            </StoreContext.Provider>
            :
            <div>404 Not Found</div>
    );
}

export default App;