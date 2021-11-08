import React, { useState } from 'react';
import LoggedOutHeader from "./components/header/LoggedOutHeader/LoggedOutHeader"
import LoggedInHeader from "./components/header/LoggedInHeader/LoggedInHeader";
import HomePageArticles from "./components/HomePageArticles/HomePageArticles";
import Footer from "./components/Footer/Footer";
import ProgressTracker from './components/ProgressTracker/ProgressTracker'
import { StoreContext, initialStoreState } from './components/store/Store';

const App = () => {
    const loggedIn = true;
    const [storeState, setStoreState] = useState(initialStoreState);

    return (
        <StoreContext.Provider value={[storeState, setStoreState]}>
            {loggedIn ?
                <React.Fragment>
                    <LoggedInHeader />
                    {/* <HomePageArticles /> */}
                    <ProgressTracker />
                    <Footer />
                </React.Fragment>
                :
                <React.Fragment>
                    <LoggedOutHeader />
                    <HomePageArticles />
                    <Footer />
                </React.Fragment>
            }
        </StoreContext.Provider>
    );
}

export default App;