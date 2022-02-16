import React, { useEffect, useState } from 'react';
import DataTable from "./DataTable";
import 'date-fns';
import useStyles from './styles'
import { getData } from '../utils/FetchUtils';
import { parseDate } from '../utils/utilFunc'
import { UGBDatePicker } from '../Global/UGBDatePicker'
import { UGBVerticalBarsChart } from '../Global/UGBCharts'
import { Typography } from '@material-ui/core';


function getWeeksAmount(dt2, dt1) {
    var diff = (dt2 - dt1) / 1000;
    diff /= (60 * 60 * 24 * 7);
    return Math.abs(Math.round(diff));
}

const ProgressTracker = ({ refreshTableData, setRefreshTableData }) => {
    const styles = useStyles();
    const [firstRenderDone, setFirstRenderDone] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([]);
    const [today] = useState(new Date());
    const [selectedOffsetDate, setSelectedOffsetDate] = useState(new Date(today.setDate(today.getDate() - 90)));
    const [selectedLimitDate, setSelectedLimitDate] = useState(new Date());
    const [minSelectedOffsetDate, setMinSelectedOffsetDate] = useState(selectedOffsetDate);
    const [maxSelectedOffsetDate, setMaxSelectedOffsetDate] = useState(selectedLimitDate);
    const [minSelectedOffsetDateIsSet, setMinSelectedOffsetDateIsSet] = useState(false);
    const [minSelectedLimitDate, setMinSelectedLimitDate] = useState(selectedOffsetDate);
    const [chartLabels, setChartLabels] = useState([]);
    const [chartValues, setChartValues] = useState([]);
    const [lineChartValues, setLineChartValues] = useState([]);
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
        let tempData = rows;
        if (tempData.length > 5) {
            tempData = tempData.slice(-5);
        }
        const labels = [];
        const values = [];
        const tempLineChartValues = [];
        for (let i = 0; i < tempData.length; i++) {
            labels.push(tempData[i].startDate + '|' + tempData[i].endDate);
            values.push(tempData[i].avgWeight);
            tempLineChartValues.push(tempData[i].weightChange);
        }
        setChartLabels(labels);
        setChartValues(values);
        setLineChartValues(tempLineChartValues);
    }, [rows])

    useEffect(() => {
        if (refreshTableData) {
            fetchTableData();
            setRefreshTableData(false);
        }
    }, [refreshTableData])

    function fetchTableData() {
        if (isFetched) {
            setIsFetched(false)
            return;
        }

        const offsetDate = parseDate(selectedOffsetDate);
        const limitDate = parseDate(selectedLimitDate);

        if (!offsetDate || !limitDate) {
            return;
        }

        getData(process.env.REACT_APP_HOST + `/api/weight-tracker/get-weight-data?offsetDate=${offsetDate}&limitDate=${limitDate}${!minSelectedOffsetDateIsSet ? `&getMinOffsetDate=${!minSelectedOffsetDateIsSet}` : ''}`)
            .then(data => {
                setRows(data.data);
                setPage(Math.ceil(data.data.length / 5));

                if (!minSelectedOffsetDateIsSet) {
                    const minxOffsetDate = new Date(data.minOffsetDate);
                    if (minSelectedOffsetDate.getTime() < minxOffsetDate.getTime()) {
                        setIsFetched(true);
                        setMinSelectedOffsetDateIsSet(true);
                        setMinSelectedOffsetDate(minxOffsetDate);
                        setSelectedOffsetDate(minxOffsetDate);
                    }
                }
            }, error => {
                setRows([]);
                setPage(0)
            })
    }

    useEffect(() => {
        if (!firstRenderDone) {
            setFirstRenderDone(true);
            return;
        }
        if (rows.length > 0) {
            return;
        }
        const parsedSelectedOffsetDateToTime = selectedOffsetDate.getTime();
        const parsedSelectedLimitDateToTime = selectedLimitDate.getTime();
        if (parsedSelectedOffsetDateToTime < parsedSelectedLimitDateToTime) {
            const weeksAmount = getWeeksAmount(parsedSelectedLimitDateToTime, parsedSelectedOffsetDateToTime) + 1;
            let startDate = new Date(selectedOffsetDate);
            const endDate = new Date(selectedOffsetDate);
            endDate.setDate(endDate.getDate() + 6);

            const tempRows = [];
            for (let i = 0; i < weeksAmount; i++) {


                tempRows.push({ startDate: parseDate(startDate), endDate: parseDate(endDate) });
                let weightSum = 0;
                let avgWeightCounter = 0;
                let dateCounter = 1;
                while (startDate.getTime() <= endDate.getTime()) {
                    tempRows[i][dateCounter] = null;
                    dateCounter++;
                    startDate.setDate(startDate.getDate() + 1);
                }

                tempRows[i].avgWeight = (weightSum / avgWeightCounter).toFixed(2);
                if (isNaN(tempRows[i].avgWeight)) {
                    tempRows[i].avgWeight = 0;
                }

                if (i === 0) {
                    tempRows[i].weightChange = 0;
                } else {
                    tempRows[i].weightChange = !tempRows[i].avgWeight ? 0 : Math.round(((tempRows[i].avgWeight - tempRows[i - 1].avgWeight) / tempRows[i - 1].avgWeight * 100) * 100) / 100;
                }
                endDate.setDate(endDate.getDate() + 7);



            }
            setPage(Math.ceil(tempRows.length / 5));
            setRows(tempRows);
        }
    }, [rows])

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
        <div style={{ padding: 30 }}>
            <div className={styles.topSide}>
                <div className={styles.datesContainer}>
                    <UGBDatePicker
                        selectedDate={selectedOffsetDate}
                        setSelectedDate={setSelectedOffsetDate}
                        minDate={minSelectedOffsetDate}
                        maxDate={maxSelectedOffsetDate}
                    />
                    <UGBDatePicker
                        selectedDate={selectedLimitDate}
                        setSelectedDate={setSelectedLimitDate}
                        minDate={minSelectedLimitDate}
                        maxDate={new Date()}
                    />
                </div>
                <div className={styles.charts}>
                    <div style={{ width:'100%' }}>
                        <Typography variant='h6' component='div' style={{ marginBottom: 15, color: '#343A40' }} >Average Weight Tracker:</Typography>
                        <UGBVerticalBarsChart
                            data={rows}
                            tooltipLabel='Average Weight'
                            color='#3DA1D7'
                            height='250px'
                            type='bar'
                            chartLabels={chartLabels}
                            chartValues={chartValues}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <Typography variant='h6' component='div' style={{ marginBottom: 15, color: '#343A40' }} >Weight Change(%) Tracker:</Typography>
                        <UGBVerticalBarsChart
                            data={rows}
                            tooltipLabel='Average Weight'
                            color='#3DA1D7'
                            height='250px'
                            type='line'
                            chartLabels={chartLabels}
                            chartValues={lineChartValues}
                        />
                    </div>
                </div>
            </div>
            <Typography variant='h6' component='div' style={{ marginTop: 15, marginBottom: 15, color: '#343A40' }} >Weight Entries: </Typography>
            <DataTable
                rows={rows}
                headCells={headCells}
                page={page}
                selectedLimitDate={selectedLimitDate}
                setPage={setPage}
                setRows={setRows}
            />
        </div>

    );
}

export default ProgressTracker;