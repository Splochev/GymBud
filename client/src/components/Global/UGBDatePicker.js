import React, { useState } from "react";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { createTheme, InputAdornment, Typography } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import { parseDate } from '../utils/utilFunc'
import { makeStyles } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles((theme) => ({
    datePicker: {
        width: '100%',
        '& .MuiFormControl-root': {
            width: '100%',
            marginTop: 0,
            marginBottom: 0,
        },
        "& .Mui-focused": {
            color: "#1B1B1B"
        },
        "& .MuiInputBase-root": {
            '&::before': {
                content: 'none'
            },
            '&::after': {
                content: 'none'
            },
            width: '100%',
            height: 40,
            borderRadius: 20,
            boxSizing: 'border-box',
            padding: '8px 16px',
            background: '#e0e0e01a',
            color: '#1B1B1B',
            boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
            '& .MuiSvgIcon-root': {
                fontSize: '21px',
                color: '#757575'
            },
        }
    },
    subTitle: {
        width: '100%',
        marginBottom: 2,
        color: '#1B1B1B',
    },
}))

const theme = createTheme({
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    }
});

export function UGBDatePicker({ label = 'Choose Date', selectedDate, setSelectedDate, maxDate, minDate }) {
    const styles = useStyles();
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        maxDate && minDate ?
            <div className={styles.datePicker}>
                {label ?
                    <Typography variant='subtitle2' component='div' className={styles.subTitle} >{label}</Typography>
                    :
                    null
                }
                <ThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EventIcon />
                                    </InputAdornment>
                                ),
                                labelWidth: 70
                            }}
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
                    <Typography variant='subtitle2' component='div' className={styles.subTitle} >{label}</Typography>
                    <ThemeProvider theme={theme}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <EventIcon />
                                        </InputAdornment>
                                    ),
                                    labelWidth: 70
                                }}
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
                        <Typography variant='subtitle2' component='div' className={styles.subTitle} >{label}</Typography>
                        <ThemeProvider theme={theme}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <EventIcon />
                                            </InputAdornment>
                                        ),
                                        labelWidth: 70
                                    }}
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
                            <Typography variant='subtitle2' component='div' className={styles.subTitle} >{label}</Typography>
                            <ThemeProvider theme={theme}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <EventIcon />
                                                </InputAdornment>
                                            ),
                                            labelWidth: 70
                                        }}
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




export const UGBStaticDatePicker = ({ date, changeDate}) => {


    // prettier-ignore
    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    autoOk
                    orientation="landscape"
                    variant="static"
                    openTo="date"
                    value={date}
                    onChange={changeDate}
                />
            </MuiPickersUtilsProvider>
        </>
    );
};
