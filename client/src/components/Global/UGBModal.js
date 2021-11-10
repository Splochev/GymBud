import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    modal: {
        display: 'block',
        position: 'fixed',
        zIndex: 2147483647,
        paddingTop: '100px',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #888',
        borderRadius: '0.3rem',
    },
    sm: {
        maxWidth: '400px',
    },
    md: {
        maxWidth: '400px',
        '@media (min-width: 860px)': {
            maxWidth: '600px',
        },
        '@media (min-width: 820px)': {
            maxWidth: '800px',
        }
    },
    lg: {
        maxWidth: '400px',
        '@media (min-width: 860px)': {
            maxWidth: '600px',
        },
        '@media (min-width: 820px)': {
            maxWidth: '800px',
        },
        '@media (min-width: 1020px)': {
            maxWidth: '1000px',
        },
        '@media (min-width: 1220px)': {
            maxWidth: '1200px',
        },
        '@media (min-width: 1420px)': {
            maxWidth: '1400px',
        },
        '@media (min-width: 1620px)': {
            maxWidth: '1600px',
        },
        '@media (min-width: 1820px)': {
            maxWidth: '1800px',
        }
    },

}));

const UGBModal = ({ width, handleClose, ...params }) => {
    const classes = useStyles();
    return (
        <div id='modal' className={classes.modal} onClick={(e) => {
            if (e.target.id === 'modal') {
                handleClose(false)
            }
        }} >
            <div className={`${classes.modalContent} ${(() => {
                switch (width) {
                    case 'sm':
                        return classes.sm;
                    case 'md':
                        return classes.md;
                    default:
                        return classes.lg;
                }
            })()}`}>
                <div className="d-flex flex-row-reverse">
                    <button onClick={() => { handleClose(false) }} type="button" className="close">
                        <span>&times;</span>
                    </button>
                </div>
                {params.children}
            </div>
        </div >
    );
}

export default UGBModal;