import { makeStyles } from '@material-ui/core';
import SpeedDialTooltipOpen from '../Global/SpeedDial';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ClearIcon from '@material-ui/icons/Clear';
import clsx from 'clsx';
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
        fontSize: '20px',
        '&:hover': {
            color: 'white'
        }
    },
    icon: {
        fontSize: '24px'
    },
    footer: {
        padding: 5,
        backgroundColor: '#343a40',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    assignmentIcon: {
        marginRight: '20px !important'
    }
}));

const Footer = () => {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const [store, setStore] = useStoreContext();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className={styles.footer}>
            <div />
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
                <>
                    <a
                        className={clsx("btn btn-outline-light btn-floating m-1", styles.assignmentIcon)}
                        href="#!"
                        rel="noreferrer"
                        role="button"
                        onClick={(e) => {
                            e.preventDefault()
                            setOpen(!open)
                        }}
                        onMouseEnter={handleOpen}
                    >
                        <i className={styles.icon} >{open ? <ClearIcon /> : <AssignmentIcon />} </i>
                    </a>
                    <SpeedDialTooltipOpen open={open} handleOpen={handleOpen} handleClose={handleClose} />
                </>
                :
                <div />
            }
        </div>
    );
}

export default Footer;