import { makeStyles } from '@material-ui/core';
import SpeedDialTooltipOpen from '../Global/SpeedDial';
import { useState } from 'react';
import { useStoreContext } from '../store/Store';

const useStyles = makeStyles((theme) => ({
    copyrightNav: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    copyrightUrl: {
        color: 'white',
        fontSize: '15px',
        '&:hover': {
            color: 'white'
        }
    },
    icon: {
        fontSize: '20px'
    },
    footer: {
        backgroundColor: '#343a40',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop:'1px solid black'
    },
    fill: {
        marginLeft: '20px'
    }
}));

const Footer = () => {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const [store] = useStoreContext();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className={styles.footer}>
            <div className={styles.fill} />
            <div className={styles.copyrightNav}>
                <div >
                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/in/stanislav-p-14023a155" rel="noreferrer" target="_blank" role="button">
                        <i className={"fab fa-linkedin-in " + styles.icon} />
                    </a>
                    <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/Splochev" rel="noreferrer" target="_blank" role="button">
                        <i className={"fab fa-github " + styles.icon} />
                    </a>
                </div>
                <a className={styles.copyrightUrl} href="https://www.linkedin.com/in/stanislav-p-14023a155" rel="noreferrer" target="_blank">
                    &copy; 2021 Stanislav Plochev
                </a>
            </div>
            {store.user ?
                <SpeedDialTooltipOpen open={open} handleOpen={handleOpen} handleClose={handleClose} />
                :
                <div />
            }
        </div >
    );
}

export default Footer;