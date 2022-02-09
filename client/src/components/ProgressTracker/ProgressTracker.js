import React, { useEffect, useState } from 'react';
import DataTable from "./DataTable";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import useStyles from './styles'
import clsx from 'clsx'
import { UGBInput } from '../Global/UGBInput';
import { getData, postData } from '../utils/FetchUtils';

function parseDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

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
            return `${rowData.startDate} - ${rowData.endDate}`
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

    const [defaultSelectedDate] = useState(new Date());
    const [maxSelectedDate] = useState(new Date(defaultSelectedDate.setDate(defaultSelectedDate.getDate())));
    const [selectedDate, setSelectedDate] = useState(new Date(defaultSelectedDate.setDate(defaultSelectedDate.getDate())));
    const [minSelectedDate] = useState(new Date(defaultSelectedDate.setDate(defaultSelectedDate.getDate() - 30)));

    const [today] = useState(new Date());
    const [selectedOffsetDate, setSelectedOffsetDate] = useState(new Date(today.setDate(today.getDate() - 90)));
    const [selectedLimitDate, setSelectedLimitDate] = useState(new Date());
    const [maxSelectedOffsetDate, setMaxSelectedOffsetDate] = useState(selectedLimitDate);
    const [minSelectedLimitDate, setMinSelectedLimitDate] = useState(selectedOffsetDate);

    function fetchTableData() {
        const offsetDate = parseDate(selectedOffsetDate);
        const limitDate = parseDate(selectedLimitDate);

        getData(process.env.REACT_APP_HOST + `/api/weight-tracker/get-weight-data?offsetDate=${offsetDate}&limitDate=${limitDate}`)
            .then(data => {
                setRows(data.data);
                setPage(Math.floor(data.data.length / 5))
            }, error => {
                setRows([]);
                setPage(0)
            })
    }

    function onSubmitWeight(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const weight = formData.get("weight")
        const parsedDate = parseDate(selectedDate);

        postData(process.env.REACT_APP_HOST + `/api/weight-tracker/submit-weight`, {
            date: parsedDate,
            weight: Number(weight)
        }).then(data => {
            formData.delete('weight');
            fetchTableData()
        }, error => {
            console.log(error)
        })

    }

    useEffect(() => {
        fetchTableData()
    }, [selectedOffsetDate, selectedLimitDate])

    useEffect(() => {
        setMaxSelectedOffsetDate(selectedLimitDate);
    }, [selectedLimitDate])

    useEffect(() => {
        setMinSelectedLimitDate(selectedOffsetDate);
    }, [selectedOffsetDate])

    return (
        <div>
            <form className={styles.weightSubmission} onSubmit={onSubmitWeight}>
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
                    minDate={minSelectedDate}
                    maxDate={maxSelectedDate}
                />
                <button type="submit" className="btn btn-success" data-toggle="tooltip" title="Calculate 1 Rep Max" >
                    <i className={clsx("fas fa-calculator", styles.icon)} ></i>
                </button>
            </form>

            <div className="d-flex justify-content-center">
                <MaterialUIPickers
                    selectedDate={selectedOffsetDate}
                    setSelectedDate={setSelectedOffsetDate}
                    maxDate={maxSelectedOffsetDate}
                />
                <MaterialUIPickers
                    selectedDate={selectedLimitDate}
                    setSelectedDate={setSelectedLimitDate}
                    minDate={minSelectedLimitDate}
                    maxDate={new Date()}
                />
            </div>


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