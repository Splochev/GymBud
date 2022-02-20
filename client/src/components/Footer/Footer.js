import { makeStyles } from '@material-ui/core';
import SpeedDialTooltipOpen from '../Global/SpeedDial';
import { useState } from 'react';
import { useStoreContext } from '../store/Store';
import UGBLink from '../Global/UGBLink';

const useStyles = makeStyles((theme) => ({
    copyrightNav: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        backgroundColor: '#343a40',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid black'
    },
    fill: {
        marginLeft: '20px'
    },
    links: {
        display: 'flex',
        gap: 10,
        marginTop: 5
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
                <div className={styles.links}>
                    <UGBLink
                        type='outlineLight'
                        url='https://www.linkedin.com/in/stanislav-plochev-14023a155/'
                        icon='fab fa-linkedin-in'
                        target='blank'
                    />
                    <UGBLink
                        type='outlineLight'
                        url='https://github.com/Splochev'
                        icon='fab fa-github'
                        target='blank'
                    />
                </div>
                <UGBLink
                    url='https://www.linkedin.com/in/stanislav-plochev-14023a155/'
                    label='&copy; 2021 Stanislav Plochev'
                    color='white'
                    target='blank'
                />
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