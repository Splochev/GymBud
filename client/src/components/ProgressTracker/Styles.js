import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    container: {
        position: 'relative',
        paddingBottom: '30px'
    },
    addButton: {
        position: 'absolute',
        left: 30,
        marginTop: '-45px',
        background: '#343a40',
        border: 'none',
        fontSize: '1.5rem',
        color: 'white',
        '&:hover': {
            color: '#3F51B5',
        },
        '&:focus': {
            outline: 'none',
            border: 'none',
        },
    },
}))