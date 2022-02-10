import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  alert: {
    background: '#DC3545'
  }
}));

export default function UGBAlert({ open, setOpen, message }) {
  const classes = useStyles();

  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
        <Alert onClose={onClose} classes={{ root: classes.alert }} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
