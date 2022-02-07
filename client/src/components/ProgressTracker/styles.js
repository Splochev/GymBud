import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    textField: {
        "& .MuiFormControl-root": {
            width: '89px',
        },
        "& .MuiFormLabel-root": {
            // color: "#868686"
        },
        "& .MuiInputBase-input": {
            minWidth: '45px',
        },
        "& .MuiInput-underline": {
            '&::before': {
                // transition: 'none',
                // borderBottom: '1px solid #868686 !important'
            },
            '&::after': {
                // transition: 'none',
                // borderBottom: '1px solid #868686 !important'
            },
        },
    },
    muiInputAdornmentRoot: {
        "& .MuiButtonBase-root": {
            '&:hover': {
                // backgroundColor: 'none',
                // background: 'none'
            }
        }
    },
    weightSubmission: {
        display: 'flex',
        alignItems: 'baseline',

    },
    tableContainerRoot5: {
        "& .MuiTableContainer-root": {

            height: '465px'
        }
    },
    // tableContainerRoot10: {
    //     "& .MuiTableContainer-root": {
    //         height: '850px'
    //     }
    // },
    // tableContainerRoot15: {
    //     "& .MuiTableContainer-root": {
    //         height: '1150px'
    //     }
    // }
}))