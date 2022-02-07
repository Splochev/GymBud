import useStyles from './styles'
import clsx from 'clsx'
import { useEffect } from 'react';
import { useStoreContext } from '../store/Store';
import { getData } from '../utils/FetchUtils';
import { useHistory } from 'react-router-dom';

const HomePageArticles = () => {
    const styles = useStyles();
    const [store, setStore] = useStoreContext();
    const history = useHistory();

    useEffect(() => {
        getData(process.env.REACT_APP_HOST + '/api/user/me')
            .then(data => {
                if (store.returnUrl) {
                    history.push(store.returnUrl);
                    setStore(state => (state.returnUrl = undefined, { ...state }))
                }
            }, error => {
                console.log('api/user/me:', error)
            });
    }, [])

    return (
        <div className={clsx("row", styles.homePageSection)}>
            <div className="col">
                <section>
                    <div className="container py-2">
                        <article className={styles.postcard}>
                            <img className={styles.postcardImg} src="/UrGymBudBackGroundLandingPage.png" alt="man doing deadlift" />
                            <div className={styles.postCardText}>
                                <div className={styles.postCardPreviewText}>
                                    <div className={styles.postCardBar}></div>
                                    <ul>
                                        <li>A little progress each day is what it's all about.</li>
                                        <li>Track daily caloric & macronutrient intake, workout sessions and
                                            much more with Ur Gym Bud</li>
                                    </ul>
                                </div>
                            </div>
                        </article>
                        <article className={styles.postcard}>
                            <img className={styles.postcardImg} src="/analytics.png" alt="computer screen and chart" />
                            <div className={styles.postCardText}>
                                <div className={clsx(styles.articleCardTextComputer, styles.postCardPreviewText)}>
                                    <div className={styles.postCardBar}></div>
                                    <ul>
                                        <li>Calculate your total daily energy expenditure calories.</li>
                                        <li>Calculate your daily calories & macronutrient intake.</li>
                                        <li>Keep track of your body composition and gym progress.</li>
                                        <li>Calculate your 1 rep max for any exercise.</li>
                                    </ul>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
            <div className="col">
                <section>
                    <div className="container py-2">
                        <article className={styles.postcard}>
                            <img className={styles.postcardImg} src="/landing-page-background-food.png" alt="cooked eggs on a pan" />
                            <div className={styles.postCardText}>
                                <div className={styles.postCardPreviewText}>
                                    <div className={styles.postCardBar}></div>
                                    <ul>
                                        <li>Check the calories macronutrients of each food.</li>
                                        <li>Build whole meals and check their calories & macronutrients.</li>
                                        <li>Add new food with their calories & macronutrients.</li>
                                        <li>Check the recipe, calories & macronutrients of already built meals.</li>
                                    </ul>
                                </div>
                            </div>
                        </article>
                        <article className={styles.postcard}  >
                            <img className={styles.postcardImg} src="/landing-page-background-woman-img.png" alt="woman doing leg press" />
                            <div className={styles.postCardText}>
                                <div className={clsx(styles.articleCardTextWoman, styles.postCardPreviewText)}>
                                    <div className={styles.postCardBar}></div>
                                    <ul>
                                        <li>Create and manage your own workout journal.</li>
                                        <li>Submit every workout's set and rep.</li>
                                    </ul>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default HomePageArticles;