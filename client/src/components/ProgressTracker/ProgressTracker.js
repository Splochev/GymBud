import React, { useEffect, useState } from 'react';
import DataTable from "./DataTable";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import useStyles from './styles'
import clsx from 'clsx'
import { UGBInput } from '../Global/UGBInput';

export function MaterialUIPickers({ selectedDate, setSelectedDate }) {
    const [today] = useState(new Date());
    const [maxDate] = useState(new Date(today.setDate(today.getDate())));
    const [minDate] = useState(new Date(today.setDate(today.getDate() - 30)));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                minDate={minDate}
                maxDate={maxDate}
                disableToolbar
                autoOk={true}
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                label="Choose date"
                value={selectedDate}
                onChange={handleDateChange}
                maxDateMessage={`Date should not be after ${maxDate.getUTCMonth() + 1 < 10 ? `0${maxDate.getUTCMonth() + 1}` : maxDate.getUTCMonth() + 1}/${maxDate.getUTCDate() < 10 ? `0${maxDate.getUTCDate()}` : maxDate.getUTCDate()}/${maxDate.getUTCFullYear()}`}
                minDateMessage={`Date should not be before ${minDate.getUTCMonth() + 1 < 10 ? `0${minDate.getUTCMonth() + 1}` : minDate.getUTCMonth() + 1}/${minDate.getUTCDate() < 10 ? `0${minDate.getUTCDate()}` : minDate.getUTCDate()}/${minDate.getUTCFullYear()}`}
            />
        </MuiPickersUtilsProvider>
    );
}



const headCells = [
    {
        id: 'dateRange',
        label: 'Date Range',
        CellRender: ({ rowData }) => {
            return `${rowData.endDate} - ${rowData.startDate}`
        }
    },
    {
        id: 1,
        numeric: true,
        label: 'Day 1',
    },
    {
        id: 2,
        numeric: true,
        label: 'Day 2',
    },
    {
        id: 3,
        numeric: true,
        label: 'Day 3',
    },
    {
        id: 4,
        numeric: true,
        label: 'Day 4',
    },
    {
        id: 5,
        numeric: true,
        label: 'Day 5',

    },
    {
        id: 6,
        numeric: true,
        label: 'Day 6',

    },
    {
        id: 7,
        numeric: true,
        label: 'Day 7',
    },
    {
        id: 'avgWeight',
        label: 'Average Weight',

    },
    {
        id: 'weightChange',
        label: 'Weight Change(%)',
        CellRender: ({ cellData }) => {
            return cellData + '%';
        }
    }
];

const ProgressTracker = () => {
    const styles = useStyles();
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        console.log(selectedDate)
    }, [])

    useEffect(() => {
        setRows([
            {
                "1": 68,
                "2": 69,
                "3": 67,
                "4": null,
                "5": null,
                "6": 68,
                "7": null,
                "startDate": "2022-01-31",
                "endDate": "2022-02-06",
                "avgWeight": "68.00",
                "weightChange": 0
            },
            {
                "1": 67,
                "2": 66,
                "3": 67,
                "4": 66,
                "5": 65,
                "6": 63,
                "7": 66,
                "startDate": "2022-02-07",
                "endDate": "2022-02-13",
                "avgWeight": "65.71",
                "weightChange": -3.37
            },
            {
                "1": 50,
                "2": 50,
                "3": 50,
                "4": 50,
                "5": 50,
                "6": 50,
                "7": 50,
                "startDate": "2022-02-14",
                "endDate": "2022-02-20",
                "avgWeight": "50.00",
                "weightChange": -23.91
            },
            {
                "1": 50,
                "2": 50,
                "3": 50,
                "4": 50,
                "5": 50,
                "6": 50,
                "7": 50,
                "startDate": "2022-02-21",
                "endDate": "2022-02-27",
                "avgWeight": "50.00",
                "weightChange": 0
            },
            {
                "1": 50,
                "2": 50,
                "3": 50,
                "4": 50,
                "5": 50,
                "6": 50,
                "7": 50,
                "startDate": "2022-02-28",
                "endDate": "2022-03-06",
                "avgWeight": "50.00",
                "weightChange": 0
            },
            {
                "1": 99,
                "2": null,
                "3": null,
                "4": null,
                "5": null,
                "6": null,
                "7": null,
                "startDate": "2022-03-07",
                "endDate": "2022-03-13",
                "avgWeight": "99.00",
                "weightChange": 98
            },
            {
                "1": null,
                "2": null,
                "3": null,
                "4": null,
                "5": null,
                "6": null,
                "7": null,
                "startDate": "2022-03-14",
                "endDate": "2022-03-20",
                "avgWeight": 0,
                "weightChange": 0
            },
            {
                "1": null,
                "2": null,
                "3": null,
                "4": null,
                "5": null,
                "6": null,
                "7": null,
                "startDate": "2022-03-21",
                "endDate": "2022-03-27",
                "avgWeight": 0,
                "weightChange": 0
            },
            {
                "1": null,
                "2": null,
                "3": null,
                "4": null,
                "5": null,
                "6": null,
                "7": null,
                "startDate": "2022-03-27",
                "endDate": "2022-04-02",
                "avgWeight": 0,
                "weightChange": 0
            },
            {
                "1": null,
                "2": null,
                "3": null,
                "4": null,
                "5": null,
                "6": null,
                "7": null,
                "startDate": "2022-04-03",
                "endDate": "2022-04-09",
                "avgWeight": 0,
                "weightChange": 0
            },
            {
                "1": null,
                "2": null,
                "3": null,
                "4": null,
                "5": null,
                "6": null,
                "7": null,
                "startDate": "2022-04-10",
                "endDate": "2022-04-16",
                "avgWeight": 0,
                "weightChange": 0
            },
            {
                "1": null,
                "2": null,
                "3": null,
                "4": null,
                "5": null,
                "6": null,
                "7": null,
                "startDate": "2022-04-17",
                "endDate": "2022-04-23",
                "avgWeight": 0,
                "weightChange": 0
            },
            {
                "1": null,
                "2": null,
                "3": null,
                "4": null,
                "5": null,
                "6": null,
                "7": null,
                "startDate": "2022-04-24",
                "endDate": "2022-04-30",
                "avgWeight": 0,
                "weightChange": 0
            },
            {
                "1": null,
                "2": null,
                "3": null,
                "4": null,
                "5": null,
                "6": null,
                "7": null,
                "startDate": "2022-05-01",
                "endDate": "2022-05-07",
                "avgWeight": 0,
                "weightChange": 0
            }
        ])
    }, [])

    return (
        <div>
            <form className={styles.weightSubmission}>
                <UGBInput
                    type='number'
                    name='weight'
                    placeholder='Weight'
                    min='1'
                    iconStart='fas fa-balance-scale'
                />
                <MaterialUIPickers
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
                <button type="submit" className="btn btn-success" data-toggle="tooltip" title="Calculate 1 Rep Max" >
                    <i className={clsx("fas fa-calculator", styles.icon)} ></i>
                </button>
            </form>
            <DataTable
                rows={rows}
                headCells={headCells}
                page={page}
                setPage={setPage}
                setRows={setRows}
            />
        </div>
    );
}

export default ProgressTracker;