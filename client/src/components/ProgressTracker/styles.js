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
    },
    datePicker: {
        marginRight: 10,
        "& .MuiFormLabel-root": {
            color: "black"
        },
        "& .Mui-focused": {
            color: "black"
        },
        "& .MuiInputBase-root": {
            '&::before': {
                content: 'none'
            },
            '&::after': {
                content: 'none'
            },
            '& input': {
                display: 'block',
                width: '100%',
                height: '24px',
                padding: '0.375rem .75rem',
                fontSize: '1rem',
                fontWeight: 40,
                lineHeight: 1.5,
                color: '#495057',
                backgroundColor: '#fff',
                backgroundClip: 'padding-box',
                border: '1px solid #ced4da',
                transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
                '&:focus': {
                    boxShadow: 'rgb(191,222,255) 0px 0px 0px 3px',
                    border: '1px solid #80BDFF',
                    outlineWidth: '0px'
                }
            },
            "& .MuiInputAdornment-root": {
                background: '#28A745',
                height: '38px',
                maxHeight: 'none',
                border: '1px solid #ced4da',
                '&:hover': {
                    background: '#218838',
                    border: '1px solid #1E7E34'
                },
                '&:focus-within': {
                    border: '1px solid #1E7E34',
                    background: '#218838',
                    boxShadow: 'rgb(163,217,176) 0px 0px 0px 3px',
                },
            },
            "& .MuiButtonBase-root": {
                '&:focus': {
                    outline: 'none',
                },
                color: 'white',
                '&:hover': {
                    background: 'none'
                },
            },
            "& .MuiInputAdornment-positionEnd": {
                marginLeft: 0,
            },
        }
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