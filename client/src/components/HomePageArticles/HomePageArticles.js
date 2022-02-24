import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import charts from '../assets/charts.svg'
import food from '../assets/food.svg'
import lifting from '../assets/lifting.svg'
import useWindowSize from '../utils/useWindowSize';

const useStyles = makeStyles((theme) => ({
    homePageContainer: {
        padding: '1.5rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 1060px)': {
            height: 'auto',
        }
    },
    svgs: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        '@media (max-width: 1060px)': {
            justifyContent: '',
            flexDirection: 'column',
            gap: 50
        }
    },
    svg: {
        width: '100%',
        height: 'auto',
    },
    title: {
        textAlign: 'center',
        color: '#1B1B1B',
        fontWeight: 'bolder',
        fontSize: '50px',
    },
    subTitle: {
        textAlign: 'center',
        color: '#1B1B1B',
        '@media (max-width: 1060px)': {
            marginBottom: 70
        }
    },
    cardTitle: {
        textAlign: 'center',
        fontWeight: 'bolder',
        fontSize: '25px',
        color: '#1B1B1B',
        marginBottom: 16
    },
    cardSubTitle: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#1B1B1B',
        display: 'flex',
        flexDirection: 'column',
        lineHeight: 1.2
    }
}));

const HomePageArticles = () => {
    const styles = useStyles();
    const size = useWindowSize();

    return (
        <div className={styles.homePageContainer}>
            <div>
                <Typography variant='h1' component='div' className={styles.title} >
                    UrGymBud{size.width <= 540 ? <br /> : ' '}Spots You!
                </Typography>
                <Typography variant='h6' component='div' className={styles.subTitle} >
                    Keep the motivation going,{size.width <= 540 ? <br /> : ' '}we'll take care of the rest.
                </Typography>
                <div className={styles.svgs}>
                    <div>
                        <img src={charts} alt='charts' className={styles.svg} />
                        <Typography variant='h1' component='div' className={styles.cardTitle} >
                            Track body &amp;{size.width <= 403 ? <br /> : ' '}workout progress.
                        </Typography>
                        <Typography variant='h6' component='div' className={styles.cardSubTitle} >
                            All measurements in one place.{size.width < 367 ? <br /> : ' '}From
                            {size.width >= 367 ? <br /> : ' '}
                            weekly weight change{size.width < 367 ? <br /> : ' '}tracking
                            {size.width >= 367 ? <br /> : ' '}
                            to exercise strength{size.width < 367 ? <br /> : ' '}testing.
                        </Typography>
                    </div>
                    <div>
                        <img src={food} alt='food' className={styles.svg} />
                        <Typography variant='h1' component='div' className={styles.cardTitle} >
                            Build food menus.
                        </Typography>
                        <Typography variant='h6' component='div' className={styles.cardSubTitle} >
                            Find the calories &amp; micronutrients
                            {size.width >= 339 ? <br /> : ' '}
                            of your
                            {size.width < 339 ? <br /> : ' '}
                            favorite food, and
                            {size.width < 339 ? <br /> : ' '}add
                            {size.width >= 339 ? <br /> : ' '}
                            it to your
                            {size.width < 339 ? <br /> : ' '}
                            food journal.
                        </Typography>
                    </div>
                    <div>
                        <img src={lifting} alt='lifting' className={styles.svg} />
                        <Typography variant='h1' component='div' className={styles.cardTitle} >
                            Build &amp; Track{size.width <= 366 ? <br /> : ' '}Workout Splits
                        </Typography>
                        <Typography variant='h6' component='div' className={styles.cardSubTitle} >
                            Make creating, changing, and following
                            {size.width > 381 ? <br /> : ' '}
                            your own workout splits easier with
                            {size.width > 381 ? <br /> : ' '}
                            our Workout Builder.
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePageArticles;