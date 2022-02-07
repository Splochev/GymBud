import React, { useEffect, useState } from 'react';
import DataTable from "./DataTable";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import useStyles from './styles'
import clsx from 'clsx'
import { UGBInput } from '../Global/UGBInput';
import { getData } from '../utils/FetchUtils';

export function MaterialUIPickers({ selectedDate, setSelectedDate, maxDate, minDate }) {

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        maxDate && minDate ?
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    minDate={minDate}
                    maxDate={maxDate}
                    disableToolbar
                    autoOk={true}
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    label="Choose date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    minDateMessage={`Date should not be before ${minDate.toISOString().split("T")[0]}`}
                    maxDateMessage={`Date should not be after ${maxDate.toISOString().split("T")[0]}`}
                />
            </MuiPickersUtilsProvider>
            :
            maxDate ?
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        maxDate={maxDate}
                        disableToolbar
                        autoOk={true}
                        variant="inline"
                        format="yyyy-MM-dd"
                        margin="normal"
                        label="Choose date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        maxDateMessage={`Date should not be after ${maxDate.toISOString().split("T")[0]}`}
                    />
                </MuiPickersUtilsProvider>
                :
                minDate ?
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            minDate={minDate}
                            disableToolbar
                            autoOk={true}
                            variant="inline"
                            format="yyyy-MM-dd"
                            margin="normal"
                            label="Choose date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            minDateMessage={`Date should not be before ${minDate.toISOString().split("T")[0]}`}
                        />
                    </MuiPickersUtilsProvider>
                    :
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            autoOk={true}
                            variant="inline"
                            format="yyyy-MM-dd"
                            margin="normal"
                            label="Choose date"
                            value={selectedDate}
                            onChange={handleDateChange}
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
    const [today] = useState(new Date());
    const [minSelectedDateDate] = useState(new Date(today.setDate(today.getDate() - 30)));
    const [maxSelectedDateDate] = useState(new Date(today.setDate(today.getDate())));
    const [selectedDate, setSelectedDate] = useState(new Date(today.setDate(today.getDate())));
    const [selectedOffsetDate, setSelectedOffsetDate] = useState(new Date(today.setDate(today.getDate() - 90)));
    const [selectedLimitDate, setSelectedLimitDate] = useState(new Date());
    const [maxSelectedOffsetDate, setMaxSelectedOffsetDate] = useState(selectedLimitDate);
    const [minSelectedLimitDate, setMinSelectedLimitDate] = useState(selectedOffsetDate);


    useEffect(() => {
        setMaxSelectedOffsetDate(selectedLimitDate);
    }, [selectedLimitDate])

    useEffect(() => {
        setMinSelectedLimitDate(selectedOffsetDate);
    }, [selectedOffsetDate])

    useEffect(() => {
        getData(process.env.REACT_APP_HOST + `/api/weight-tracker/get-weight-data?offsetDate=${selectedOffsetDate.toISOString().split('T')[0]}&limitDate=${selectedLimitDate.toISOString().split('T')[0]}`)
            .then(data => {
                setRows(data.data);
            }, error => {
                setRows([]);
            })
    }, [selectedOffsetDate, selectedLimitDate])

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
                    maxDate={minSelectedDateDate}
                    minDate={maxSelectedDateDate}
                />
                <button type="submit" className="btn btn-success" data-toggle="tooltip" title="Calculate 1 Rep Max" >
                    <i className={clsx("fas fa-calculator", styles.icon)} ></i>
                </button>
            </form>

            <MaterialUIPickers
                selectedDate={selectedOffsetDate}
                setSelectedDate={setSelectedOffsetDate}
                maxDate={maxSelectedOffsetDate}
            />
            <MaterialUIPickers
                selectedDate={selectedLimitDate}
                setSelectedDate={setSelectedLimitDate}
                minDate={minSelectedLimitDate}
            />
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