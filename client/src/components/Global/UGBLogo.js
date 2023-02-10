import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import logoNoBackgroundWhite from '../assets/logo-no-background-white.svg'

const useStyles = makeStyles((theme) => ({
    logo: {
        display: 'inline-block',
        lineHeight: 'inherit',
        whiteSpace: 'nowrap',
        paddingTop: theme.spacing(0.3125),
        paddingBottom: theme.spacing(0.3125),
        fontSize: theme.spacing(1.25),
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(0.5),
    },
    image: {
        height: theme.spacing(5.25)
    }
}));


const UGBLogo = ({ setToggleNav }) => {
    const history = useHistory();
    const styles = useStyles();
    
    return (
        <a
            className={styles.logo}
            href="#!"
            onClick={(e) => {
                e.preventDefault();
                history.push('/home');
                if (setToggleNav) {
                    setToggleNav(false);
                }
            }}
        >
            <img src={logoNoBackgroundWhite} alt="Logo" className={styles.image} />
        </a>
    );
}

export default UGBLogo;