import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    textField: {
        "& .MuiFormControl-root": {
            width: '89px',
        },
        "& .MuiFormLabel-root": {
            color: "#868686"
        },
        "& .MuiInputBase-input": {
            minWidth: '45px',
        },
        "& .MuiInput-underline": {
            '&::before': {
                transition: 'none',
                borderBottom: '1px solid #868686 !important'
            },
            '&::after': {
                transition: 'none',
                borderBottom: '1px solid #868686 !important'
            },
        },
    },
    muiInputAdornmentRoot: {
        "& .MuiButtonBase-root": {
            '&:hover': {
                background: 'none',
                color: 'black'
            }
        }
    },
    tableContainerRoot5: {
        "& .MuiTableContainer-root": {
            minHeight: '587px'
        }
    },
    container: {
        width: '100%',
        position: 'relative',
        "& .MuiTableRow-root": {
            "& .MuiTableCell-root": {
                borderRight: '1px solid #E0E0E0'
            },
            "& .MuiTableCell-root:last-child": {
                borderRight: 'none'
            }
        },
        "& .MuiTableHead-root": {
            background: '#343A40',
            "& .MuiButtonBase-root": {
                color: 'white'
            },
            "& .MuiSvgIcon-root": {
                color: 'white !important'
            }
        },
        "& .MuiTablePagination-root": {
            background: '#343A40',
            '& .MuiTypography-root': {
                color: 'white'
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
        width: '100%'
    },
    datesContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
    },
    unsortableHead: {
        color: 'white'
    },
    dateRangeCol: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    startDate: {
        borderBottom:"1px solid #757575"
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