import useStyles from './styles'


const HomePageArticles = () => {
    const classes = useStyles();
    return (
        <div className="home-page-section row">
            <div className="col">
                <section className="light">
                    <div className="container py-2">
                        <article className="postcard light">
                            <img className="postcard__img" src="/UrGymBudBackGroundLandingPage.png" alt="man doing deadlift" />
                            <div className="postcard__text t-dark">
                                <div className="postcard__preview-txt">
                                    <div className="postcard__bar"></div>
                                    A little progress each day is what it's all about.
                                    <br></br>Track daily caloric & macronutrient intake, workout sessions and
                                    much more with Ur Gym Bud
                                </div>
                            </div>
                        </article>
                        <article className="postcard light">
                            <img className="postcard__img" src="/analytics.png" alt="computer screen and chart" />
                            <div className="postcard__text t-dark">
                                <div className="postcard__preview-txt right-side-text">
                                    <div className="postcard__bar"></div>
                                    Calculate your total daily energy
                                    expenditure calories.
                                    <br></br>Calculate your daily calories & macronutrient intake.
                                    <br></br>Keep track of your body composition and gym progress.
                                    <br></br>Calculate your 1 rep max for any exercise.
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
            <div className="col">
                <section className="light">
                    <div className="container py-2">
                        <article className="postcard light">
                            <img className="postcard__img" src="/landing-page-background-food.png" alt="cooked eggs on a pan" />
                            <div className="postcard__text t-dark">
                                <div className="postcard__preview-txt right-side-text">
                                    <div className="postcard__bar"></div>
                                    Check the calories & macronutrients of
                                    each food.
                                    <br></br>Build whole meals and check their calories & macronutrients.
                                    <br></br>Add new food with their calories & macronutrients.
                                    <br></br>Check the recipe, calories & macronutrients of already built meals.
                                </div>
                            </div>
                        </article>
                        <article className="postcard light"  >
                            <img className="postcard__img" src="/landing-page-background-woman-img.png" alt="woman doing leg press" />
                            <div className="postcard__text t-dark">
                                <div className={"postcard__preview-txt" + " " + classes.articleCardText}>
                                    <div className="postcard__bar"></div>
                                    Create and manage your own workout journal.
                                    <br></br>Submit every workout's set and rep.
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