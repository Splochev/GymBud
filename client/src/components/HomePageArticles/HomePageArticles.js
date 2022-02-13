import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    articleCardTextWoman: {
        paddingBottom: '30px'
    },
    homePageSection: {
        marginRight: 0,
        marginLeft: 0,
        marginTop: 30,
    },
    postcard: {
        flexWrap: 'wrap',
        display: 'flex',
        borderRadius: '10px',
        margin: '0 0 2rem 0',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'black',
        color: 'white',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: 'linear-gradient(-70deg, #343a40, transparent 60%)',
            opacity: 1
        },
        '&:hover': {
            "& $postCardBar": {
                width: '95%'
            }
        },
        '@media (min-width: 1500px)': {
            flexWrap: 'inherit',
            '&:hover': {
                "& $postcardImg": {
                    transform: 'scale(1.1)'
                }
            },
            '&:nth-child(2n+0)': {
                flexDirection: 'row-reverse',
                "& $postCardText": {
                    '&::before': {
                        right: '-12px',
                        transform: 'rotate(-4deg)'
                    },
                }
            },
            '&:nth-child(2n+1)': {
                "& $postCardText": {
                    '&::before': {
                        left: '-12px',
                        transform: 'rotate(4deg)'
                    },
                }
            },

        }
    },
    postcardImg: {
        maxHeight: '180px',
        width: '100%',
        objectFit: 'cover',
        position: 'relative',
        '@media (min-width: 1500px)': {
            maxWidth: '300px',
            maxHeight: '100%',
            transition: 'transform 0.3s ease'
        }
    },
    postCardBar: {
        width: '50px',
        height: '10px',
        margin: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#343a40',
        transition: 'width 0.2s ease'
    },
    postCardText: {
        position: 'relative',
        '@media (min-width: 1500px)': {
            padding: '3rem',
            width: '100%',
            '&::before': {
                background: '#343a40',
                content: '""',
                position: 'absolute',
                display: 'block',
                top: '-20%',
                height: '130%',
                width: '55px'
            },
        }
    },
    postCardPreviewText: {
        height: '100%',
        fontSize: '20px',
        paddingRight: '40px',
        paddingLeft: '40px'
    }
}));

const HomePageArticles = () => {
    const styles = useStyles();

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
                                <div className={styles.postCardPreviewText}>
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