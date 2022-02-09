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
            minHeight: '587px'
        }
    },
    container: {
        "& .MuiTableCell-root": {
            borderRight: '1px solid #E0E0E0'
        },
        "& .MuiTableHead-root": {
            background: '#343A40',
            // opacity: 0.6,
            "& .MuiButtonBase-root": {
                color: 'white'
            },
            "& .MuiSvgIcon-root": {
                color: 'white !important'
            }
        },
        "& .MuiTablePagination-root": {
            background: '#343A40',
            // opacity: 0.6,
            '& .MuiTypography-root': {
                color:'white'
            },
            '& .MuiInputBase-root': {
                color: 'white'
            },
            "& .MuiSvgIcon-root": {
                color: 'white !important'
            }
        }, 
        marginBottom: 15
    },
    blackStripe: {
        backgroundColor: 'black',
        paddingTop: '10px',
        // opacity: 0.6,
    }
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