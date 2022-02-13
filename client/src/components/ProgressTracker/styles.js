import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    textField: {
        // "& .MuiFormControl-root": {
        //     width: '90px',
        // },
        "& .MuiFormLabel-root": {
            color: "#868686"
        },
        // "& .MuiInputBase-input": {
        //     minWidth: '45px',
        // },
        "& .MuiInput-underline": {
            '&::before': {
                transition: 'none',
                borderBottom: '1px solid #868686 !important'
            },
            '&::after': {
                transition: 'none',
                borderBottom: '1px solid black !important'
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
    container: {
        "& .MuiTableContainer-root": {
            minHeight: '601px',
            borderRadius: '5px 5px 0 0',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            width: '1250px',
        },
        "& .MuiTableHead-root": {
            background: '#28A745',
            "& .MuiButtonBase-root": {
                color: 'white'
            },
            "& .MuiSvgIcon-root": {
                color: 'white !important',
                fontSize: '20px'
            },
            "& .MuiTableCell-root": {
                borderBottom: '1px solid #343A40',
            }
        },
        "& .MuiTableBody-root": {
            "& .MuiTableRow-root": {
                '&:nth-child(even)': {
                    background: '#DFF2E3',
                },
                "& .MuiTableCell-root": {
                    borderBottom: '1px solid #343A40',
                    borderTop: '1px solid #343A40',
                }
            }
        }
    },
    greenStripe: {
        backgroundColor: '#28A745',
        paddingTop: '3px',
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
        borderBottom: "1px solid #757575"
    },
    progressTrackerContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        gap: 20,
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    leftSide: {
        height: '100%',
        background: 'green',
        padding: 300
    },
    borderedCellRight: {
        borderRight: '1px solid #343A40'
    },
    borderedCellLeft: {
        borderLeft: '1px solid #343A40'
    },
    pagination: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center'
    }
}))