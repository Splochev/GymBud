import React, { useState, useEffect } from 'react';
import LoggedOutHeader from "./components/header/LoggedOutHeader/LoggedOutHeader"
import LoggedInHeader from "./components/header/LoggedInHeader/LoggedInHeader";
import HomePageArticles from "./components/HomePageArticles/HomePageArticles";
import Footer from "./components/Footer/Footer";
import ProgressTracker from './components/ProgressTracker/ProgressTracker'
import { StoreContext, initialStoreState } from './components/store/Store';
import { Route, Redirect } from 'react-router';
import { Switch, BrowserRouter, useHistory } from 'react-router-dom';
import { getData } from './components/utils/FetchUtils'
import { useStoreContext } from './components/store/Store'
import { makeStyles } from '@material-ui/core/styles';
import WorkoutBuilder from './components/WorkoutBuilder/WorkoutBuilder';
import clsx from 'clsx';
require("dotenv").config();

const AutoLoginComponent = ({ children }) => {
    const [state, setState] = useStoreContext();
    const history = useHistory();

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
    const [refreshTableData, setRefreshTableData] = useState(false);

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
                                <LoggedInHeader refreshTableData={refreshTableData} setRefreshTableData={setRefreshTableData} />
                                <div className={clsx(styles.contentContainer, storeState.hasOverflow ? styles.hasOverflow : '')}>
                                    <Switch>
                                        <Route exact path="/home" component={HomePageArticles} />
                                        <Route
                                            exact path='/progress'
                                            render={props => <ProgressTracker refreshTableData={refreshTableData} setRefreshTableData={setRefreshTableData} />}
                                        />
                                        <Route exact path="/workout-builder" component={WorkoutBuilder} />
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