import React, { useState, useEffect } from 'react';
import LoggedOutHeader from "./components/header/LoggedOutHeader/LoggedOutHeader"
import LoggedInHeader from "./components/header/LoggedInHeader/LoggedInHeader";
import HomePageArticles from "./components/HomePageArticles/HomePageArticles";
import Footer from "./components/Footer/Footer";
import ProgressTracker from './components/ProgressTracker/ProgressTracker'
import { StoreContext, initialStoreState } from './components/store/Store';
import { Route, Redirect } from 'react-router';
import { Switch, BrowserRouter } from 'react-router-dom';
import { getData } from './components/utils/FetchUtils'
require("dotenv").config();


const App = () => {
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

        setIsFetchAttached(true);

        getData(process.env.REACT_APP_HOST + '/api/user/me')
            .then(data => {
                setStoreState(state => (state.user = data, { ...state }))
            }, error => {
                setStoreState(state => (state.user = undefined, { ...state }))
                console.log('api/user/me:', error)
            });


        if (!storeState.returnUrl) {
            setStoreState(state => (state.returnUrl = window.location.pathname, { ...state }))
        }

        return () => {
            window.fetch = originalFetch;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        isFetchAttached ?
            <StoreContext.Provider value={[storeState, setStoreState]}>
                <BrowserRouter>
                    {storeState.user ?
                        <div>
                            <LoggedInHeader />
                            <div>
                                <Switch>
                                    <Route exact path="/home" component={HomePageArticles} />
                                    <Route exact path="/progress-tracker" component={ProgressTracker} />
                                    <Redirect from="*" to="/home" />
                                </Switch>
                            </div>
                            <Footer />
                        </div>
                        :
                        <div>
                            <LoggedOutHeader />
                            <div>
                                <Switch>
                                    <Route exact path="/home" component={HomePageArticles} />
                                    <Redirect from="*" to="/home" />
                                </Switch>
                            </div>
                            <Footer />
                        </div>
                    }
                </BrowserRouter>
            </StoreContext.Provider>
            :
            <div>404 Not Found</div>
    );
}

export default App;