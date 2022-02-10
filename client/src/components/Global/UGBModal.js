import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    hasPadding: {
        padding: '1.5rem'
    },
    actions: {
        display: 'flex',
        justifyContent: "flex-end",
        "& button:first-child": {
            marginRight: theme.spacing(2),
        },
        "& button": {
            width: '93px'
        }
    }
}));

function UGBModal({ open, onClose, maxWidth, hasPadding = true, fullWidth=true, children }) {
    const styles = useStyles();
    return (
        <Dialog
            open={open}
            onClose={onClose ? onClose : null}
            TransitionComponent={Transition}
            // maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
            maxWidth={maxWidth}
            fullWidth={fullWidth}
        >
            <div className={hasPadding ? styles.hasPadding : null}>
                {children}
            </div>
        </Dialog>
    );
}

export default UGBModal;