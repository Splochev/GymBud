import { useEffect } from "react";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    alert: {
        background: '#f8d7da',
        color: '#721c24',
        padding: '.75rem 1.25rem',
        width: '100%',
        border: '1px solid #f5c6cb',
        borderRadius: theme.spacing(0.25)
    }
}));


const UGBMissingFields = (props) => {
    const styles = useStyles();

    function closeAlert() {
        props.setAlert('');
    }

    useEffect(() => {
        setTimeout(() => { closeAlert() }, 2000);
    }, []);

    return (
        <div className={styles.alert} >
            {props.alertMessage}
        </div>
    );
}

export default UGBMissingFields;