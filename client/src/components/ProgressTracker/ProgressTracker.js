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
    const [rows, setRows] = useState([{
        endDate: '11/28/2021',
        startDate: '12/04/2021',
        1: 68.0,
        2: 67.3,
        3: 67.3,
        4: null,
        5: 67.3,
        6: 67.7,
        7: 67.7,
        avgWeight: 67.55,
        weightChange: 0,
    },
    {
        endDate: '12/05/2021',
        startDate: '12/11/2021',
        1: 67.7,
        2: 67.3,
        3: 67.1,
        4: 67.0,
        5: 66.6,
        6: null,
        7: 66.4,
        avgWeight: 67.02,
        weightChange: -0.79,
    }



    ]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        console.log(selectedDate)
    }, [selectedDate])

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
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                order={order}
                setOrder={setOrder}
            />
        </div>
    );
}

export default ProgressTracker;