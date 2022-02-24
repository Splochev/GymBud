import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { createTheme, Typography } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import { parseDate } from '../utils/utilFunc'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    datePicker: {
        '& .MuiFormControl-root': {
            marginTop: 0,
            marginBottom: 0
        },
        "& .MuiFormLabel-root": {
            color: "black",
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
    },
    subTitle: {
        color: '#1B1B1B',
        padding: 0,
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: '0.00938em',
        textAlign: 'left',
        width: '100%',
        marginTop: 3,
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        transform: 'translate(0, 1.5px) scale(0.75)',
        transformOrigin: 'top left'
    },
}))

const theme = createTheme({
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    }
});

export function UGBDatePicker({ selectedDate, setSelectedDate, maxDate, minDate }) {
    const styles = useStyles();
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        maxDate && minDate ?
            <div className={styles.datePicker}>
                <Typography variant='subtitle2' component='div' className={styles.subTitle} >Choose Date</Typography>
                <ThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            minDate={parseDate(minDate)}
                            maxDate={parseDate(maxDate)}
                            disableToolbar
                            autoOk={true}
                            variant="inline"
                            format="yyyy-MM-dd"
                            margin="normal"
                            value={selectedDate}
                            onChange={handleDateChange}
                            minDateMessage={`Date should not be before ${parseDate(minDate)}`}
                            maxDateMessage={`Date should not be after ${parseDate(maxDate)}`}
                        />
                    </MuiPickersUtilsProvider>
                </ThemeProvider>
            </div >
            :
            maxDate ?
                <div className={styles.datePicker}>
                    <Typography variant='subtitle2' component='div' className={styles.subTitle} >Choose Date</Typography>
                    <ThemeProvider theme={theme}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                maxDate={parseDate(maxDate)}
                                disableToolbar
                                autoOk={true}
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                value={selectedDate}
                                onChange={handleDateChange}
                                maxDateMessage={`Date should not be after ${parseDate(maxDate)}`}
                            />
                        </MuiPickersUtilsProvider>
                    </ThemeProvider>
                </div>
                :
                minDate ?
                    <div className={styles.datePicker}>
                        <Typography variant='subtitle2' component='div' className={styles.subTitle} >Choose Date</Typography>
                        <ThemeProvider theme={theme}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    minDate={parseDate(minDate)}
                                    disableToolbar
                                    autoOk={true}
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    minDateMessage={`Date should not be before ${parseDate(minDate)}`}
                                />
                            </MuiPickersUtilsProvider>
                        </ThemeProvider>
                    </div >
                    :
                    <>
                        <div className={styles.datePicker}>
                            <Typography variant='subtitle2' component='div' className={styles.subTitle} >Choose Date</Typography>
                            <ThemeProvider theme={theme}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        autoOk={true}
                                        variant="inline"
                                        format="yyyy-MM-dd"
                                        margin="normal"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                    />
                                </MuiPickersUtilsProvider>
                            </ThemeProvider>
                        </div >
                    </>
    );
}
