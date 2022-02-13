import React, { useEffect, useState } from 'react';
import DataTable from "./DataTable";
import 'date-fns';
import useStyles from './styles'
import { getData } from '../utils/FetchUtils';
import { parseDate } from '../utils/utilFunc'
import { UGBDatePicker } from '../Global/UGBDatePicker'

const ProgressTracker = ({ refreshTableData, setRefreshTableData }) => {
    const styles = useStyles();
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([]);
    const [today] = useState(new Date());
    const [selectedOffsetDate, setSelectedOffsetDate] = useState(new Date(today.setDate(today.getDate() - 90)));
    const [selectedLimitDate, setSelectedLimitDate] = useState(new Date());
    const [maxSelectedOffsetDate, setMaxSelectedOffsetDate] = useState(selectedLimitDate);
    const [minSelectedLimitDate, setMinSelectedLimitDate] = useState(selectedOffsetDate);
    const [headCells] = useState([
        {
            id: 'dateRange',
            label: 'Date Range',
            CellRender: ({ rowData }) => {
                let parsedStartDate = parseDate(new Date(rowData.startDate));
                let parsedEndDate = parseDate(new Date(rowData.endDate));
                return (
                    <div className={styles.dateRangeCol}>
                        <div className={styles.startDate}>{parsedStartDate}</div>
                        <div>{parsedEndDate}</div>
                    </div>
                );
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
    ]);

    useEffect(() => {
        if (refreshTableData) {
            fetchTableData();
            setRefreshTableData(false);
        }
    }, [refreshTableData])

    function fetchTableData() {
        const offsetDate = parseDate(selectedOffsetDate);
        const limitDate = parseDate(selectedLimitDate);

        if (!offsetDate || !limitDate) {
            return;
        }

        getData(process.env.REACT_APP_HOST + `/api/weight-tracker/get-weight-data?offsetDate=${offsetDate}&limitDate=${limitDate}`)
            .then(data => {
                setRows(data.data);
                setPage(Math.ceil(data.data.length / 5))
            }, error => {
                setRows([]);
                setPage(0)
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

        <div className={styles.progressTrackerContainer}>
            <div className={styles.leftSide}></div>
            <div className={styles.rightSide}>
                <div className={styles.datesContainer}>
                    <UGBDatePicker
                        selectedDate={selectedOffsetDate}
                        setSelectedDate={setSelectedOffsetDate}
                        maxDate={maxSelectedOffsetDate}
                    />
                    <UGBDatePicker
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
        </div>

    );
}

export default ProgressTracker;