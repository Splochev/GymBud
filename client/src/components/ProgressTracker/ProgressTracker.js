import React, { useEffect, useState } from 'react';
import DataTable from "./DataTable";
import 'date-fns';
import useStyles from './styles'
import { getData, putData } from '../utils/FetchUtils';
import { parseDate } from '../utils/utilFunc'
import { UGBDatePicker } from '../Global/UGBDatePicker'
import { UGBVerticalBarsChart } from '../Global/UGBCharts'
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { UGBButton } from '../Global/UGBButton';

function getWeeksAmount(dt2, dt1) {
    var diff = (dt2 - dt1) / 1000;
    diff /= (60 * 60 * 24 * 7);
    return Math.abs(Math.round(diff));
}

function getBarChartWidth(barsCount) {
    if (barsCount === 1) {
        return '180px'
    } else if (barsCount === 0) {
        return '100%'
    }
    return `${180 + ((barsCount * (barsCount - 1)) / 2) + (100 * (barsCount - 1))}px`
}

const ProgressTracker = ({ refreshTableData, setRefreshTableData }) => {
    const styles = useStyles();
    const history = useHistory();
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
    const [fillTable, setFillTable] = useState(true);
    const [minSelectedLimitDate, setMinSelectedLimitDate] = useState(selectedOffsetDate);
    const [chartLabels, setChartLabels] = useState([]);
    const [chartValues, setChartValues] = useState([]);
    const [lineChartValues, setLineChartValues] = useState([]);
    const [chartWidth, setChartWidth] = useState('100%');
    const [changes, setChanges] = useState({});
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
        const labels = [];
        const values = [];
        const tempLineChartValues = [];
        for (let i = 0; i < rows.length; i++) {
            labels.push(rows[i].startDate + '|' + rows[i].endDate);
            values.push(rows[i].avgWeight);
            tempLineChartValues.push(rows[i].weightChange);
        }
        setChartWidth(getBarChartWidth(values.length));
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
                if (!data.data.length) {
                    setFillTable(false);
                } else {
                    setFillTable(true);
                }
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
                setPage(0);
                setFillTable(true);
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

        if (!fillTable) {
            setFillTable(false);
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

    function saveChanges() {
        putData(process.env.REACT_APP_HOST + `/api/weight-tracker/edit-weights`, changes)
            .then(data => {
                fetchTableData();
                setChanges({});
            }, error => {

            })
    }

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
            </div>
            <div className={styles.charts}>
                <div className={styles.barChart}>
                    <Typography variant='h6' component='div' style={{ marginBottom: 15, color: '#1B1B1B' }} >Average Weight Tracker:</Typography>
                    <div style={{ width: chartWidth }}>
                        <UGBVerticalBarsChart
                            data={rows}
                            tooltipLabel='Average Weight'
                            hoverTooltipLabel=' kg'
                            colorTop='#3DA1D7'
                            height='250px'
                            type='bar'
                            chartLabels={chartLabels}
                            chartValues={chartValues}
                        />
                    </div>
                    <hr style={{ width: `calc(${chartWidth} - 67px)` }} className={styles.chartLine} />
                </div>
                <div style={{ width: '100%' }}>
                    <Typography variant='h6' component='div' style={{ marginBottom: 15, color: '#1B1B1B' }} >Weight Change(%) Tracker:</Typography>
                    <UGBVerticalBarsChart
                        data={rows}
                        tooltipLabel='Weight Change'
                        hoverTooltipLabel='%'
                        colorTop='#3DA1D7'
                        colorBottom='#3DA1D7'
                        height='250px'
                        type='line'
                        chartLabels={chartLabels}
                        chartValues={lineChartValues}
                    />
                </div>
            </div>
            <div className={styles.toolbar}>
                <Typography variant='h6' component='div' style={{ marginTop: 15, marginBottom: 15, color: '#1B1B1B' }} >Weight Entries: </Typography>
                <div className={styles.actions}>
                    <UGBButton
                        btnType='primary'
                        onClick={() => {
                            history.push({ search: "?tab=track-weight", state: { fromPopup: true } });
                        }}
                    >
                        Track weight
                    </UGBButton>
                    <UGBButton
                        btnType='primary'
                        onClick={() => saveChanges()}
                    >
                        Save Changes
                    </UGBButton>
                </div>
            </div>
            <DataTable
                rows={rows}
                headCells={headCells}
                page={page}
                selectedLimitDate={selectedLimitDate}
                setPage={setPage}
                setRows={setRows}
                setChanges={setChanges}
            />
        </div>

    );
}

export default ProgressTracker;