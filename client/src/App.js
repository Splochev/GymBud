import React, { useState } from 'react';
import LoggedOutHeader from "./components/header/LoggedOutHeader/LoggedOutHeader"
import LoggedInHeader from "./components/header/LoggedInHeader/LoggedInHeader";
import HomePageArticles from "./components/HomePageArticles/HomePageArticles";
import Footer from "./components/Footer/Footer";
import ProgressTracker from './components/ProgressTracker/ProgressTracker'
import { StoreContext, initialStoreState } from './components/store/Store';

import { Route, Redirect } from 'react-router';
import { Switch, BrowserRouter } from 'react-router-dom';



const App = () => {
    const [storeState, setStoreState] = useState(initialStoreState);

    return (
        <StoreContext.Provider value={[storeState, setStoreState]}>

            <BrowserRouter>
                {storeState.user || sessionStorage.getItem('user') ?
                    <div>
                        <LoggedInHeader />
                        <div>
                            <Switch>
                                <Route exact path="/home" component={HomePageArticles} />
                                <Route exact path="/progress-tracker" component={ProgressTracker} />
                                <Redirect from="*"  to="/home" />
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
    );
}

export default App;