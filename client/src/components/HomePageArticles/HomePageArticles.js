import useStyles from './styles'


const HomePageArticles = () => {
    const classes = useStyles();
    return (
        <div className={"row " + classes.homePageSection}>
            <div className="col">
                <section>
                    <div className="container py-2">
                        <article className={classes.postcard}>
                            <img className={classes.postcardImg + ' postCardImg'} src="/UrGymBudBackGroundLandingPage.png" alt="man doing deadlift" />
                            <div className={"postCardText " + classes.postCardText}>
                                <div className={classes.postCardPreviewText}>
                                    <div className={"postCardBar " + classes.postCardBar}></div>
                                    <ul>
                                        <li>A little progress each day is what it's all about.</li>
                                        <li>Track daily caloric & macronutrient intake, workout sessions and
                                            much more with Ur Gym Bud</li>
                                    </ul>
                                </div>
                            </div>
                        </article>
                        <article className={classes.postcard}>
                            <img className={classes.postcardImg + ' postCardImg'} src="/analytics.png" alt="computer screen and chart" />
                            <div className={"postCardText " + classes.postCardText}>
                                <div className={`${classes.articleCardTextComputer} ${classes.postCardPreviewText}`}>
                                    <div className={"postCardBar " + classes.postCardBar}></div>
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
                        <article className={classes.postcard}>
                            <img className={classes.postcardImg + ' postCardImg'} src="/landing-page-background-food.png" alt="cooked eggs on a pan" />
                            <div className={"postCardText " + classes.postCardText}>
                                <div className={classes.postCardPreviewText}>
                                    <div className={"postCardBar " + classes.postCardBar}></div>
                                    <ul>
                                        <li>Check the calories macronutrients of each food.</li>
                                        <li>Build whole meals and check their calories & macronutrients.</li>
                                        <li>Add new food with their calories & macronutrients.</li>
                                        <li>Check the recipe, calories & macronutrients of already built meals.</li>
                                    </ul>
                                </div>
                            </div>
                        </article>
                        <article className={classes.postcard}  >
                            <img className={classes.postcardImg + ' postCardImg'} src="/landing-page-background-woman-img.png" alt="woman doing leg press" />
                            <div className={"postCardText " + classes.postCardText}>
                                <div className={`${classes.articleCardTextWoman} ${classes.postCardPreviewText}`}>
                                    <div className={"postCardBar " + classes.postCardBar}></div>
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