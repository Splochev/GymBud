
import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { UGBDatePicker } from '../Global/UGBDatePicker';
import UGBLabel from '../Global/UGBLabel';
import { useHistory } from 'react-router-dom';
import { UGBVerticalBarsChart } from '../Global/UGBCharts';
import { getData, putData } from '../utils/FetchUtils';
import { parseDate } from '../utils/utilFunc'
import clsx from 'clsx';
import { BrandAlert } from '../Global/BrandAlert';
import UGBModal from '../Global/UGBModal';
import { UGBButton } from '../Global/UGBButton';
import { useQuery } from '../utils/RouteUtils';
import { WeightEntriesTable } from './WeightEntriesTable';

const useStyles = makeStyles((theme) => ({
    datesContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        '@media (max-width: 550px)': {
            flexDirection: 'column',
            justifyContent: 'center',
            gap: theme.spacing(1.25),
            width: '100%'
        }
    },
    dateSelect: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        '@media (max-width: 550px)': {
            width: '100%',
        }
    },
    charts: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: theme.spacing(3.75),
        "& canvas": {
            width: '100% !important'
        },
        '@media (max-width: 1000px)': {
            flexDirection: 'column',
            "& canvas": {
                width: '100% !important'
            }
        },
    },
    barChart: {
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        position: 'relative'
    },
    chartLabel: {
        marginBottom: theme.spacing(2)
    },
    chartLine: {
        border: 'none',
        borderBottom: '1px solid #3DA1D7',
    },
    fullBarChartChartLine: {
        marginTop: theme.spacing(-2.5),
        marginLeft: theme.spacing(7),
        minWidth: 'calc(100% - 56px)'
    },
    emptyBarChartChartLine: {
        marginTop: theme.spacing(-1.625),
        marginLeft: theme.spacing(6.5),
        minWidth: 'calc(100% - 52px)'
    },
    lineChart: {
        width: '100%'
    },
    alert: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        height: theme.spacing(2.375),
        textAlign: 'center',
        '@media (max-width: 448px)': {
            height: theme.spacing(4.75),
        },
    },
    dateRangeCol: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: theme.spacing(9.125),
    },
    startDate: {
        borderBottom: "1px solid #757575"
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        '& .MuiButton-root': {
            width: theme.spacing(17.625),
        },
        '@media (max-width: 820px)': {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: theme.spacing(1.25),
            width: '100%'
        }
    },
    actions: {
        width: '100%',
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
        "& button:first-child": {
            marginRight: theme.spacing(2),
        },
    }
}));

function getBarChartWidth(barsCount) {
    if (barsCount === 1) {
        return '180px'
    } else if (barsCount === 0) {
        return '100%'
    }
    return `${180 + ((barsCount * (barsCount - 1)) / 2) + (100 * (barsCount - 1))}px`
};

const EditWeightEntries = () => {
    const styles = useStyles();
    const history = useHistory();
    const [limitDate, setLimitDate] = useState(new Date());
    const [offsetDate, setOffsetDate] = useState(null);
    const [maxDate] = useState(new Date());
    const [refresh, setRefreshData] = useState({});
    const [diffIsLessOrEqualTo6Months, setDiffIsLessOrEqualTo6Months] = useState(null);
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
            label: 'Monday',
        },
        {
            id: 2,
            numeric: true,
            label: 'Tuesday',
        },
        {
            id: 3,
            numeric: true,
            label: 'Wednesday',
        },
        {
            id: 4,
            numeric: true,
            label: 'Thursday',
        },
        {
            id: 5,
            numeric: true,
            label: 'Friday',

        },
        {
            id: 6,
            numeric: true,
            label: 'Saturday',

        },
        {
            id: 7,
            numeric: true,
            label: 'Sunday',
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
    const [weightEntries, setWeightEntries] = useState([]);
    const [page, setPage] = useState(0);
    const [alert, setAlert] = useState('');
    const [changes, setChanges] = useState({});
    const [saveDisabled, setSaveDisabled] = useState(true);

    useEffect(() => {
        const tempOffsetDate = new Date(limitDate);
        tempOffsetDate.setDate(tempOffsetDate.getDate() - 183);
        setOffsetDate(tempOffsetDate);
    }, []);

    useEffect(() => {
        if (limitDate && offsetDate) {
            const daysDifference = Math.floor((limitDate.getTime() - offsetDate.getTime()) / 86400000);
            if (daysDifference <= 183) {
                setDiffIsLessOrEqualTo6Months(true);
                setRefreshData({});
            } else {
                setDiffIsLessOrEqualTo6Months(false);
                setRefreshData({});
            }
        }
    }, [limitDate, offsetDate]);

    useEffect(() => {
        if (diffIsLessOrEqualTo6Months === true || diffIsLessOrEqualTo6Months === false) {
            if (diffIsLessOrEqualTo6Months) {
                setAlert('');
                fetchTableData();
            } else {
                setAlert('Date range should not be bigger than 6 months.');
            }
        }
    }, [diffIsLessOrEqualTo6Months, refresh]);

    useEffect(() => {
        if (Object.keys(changes).length) {
            setSaveDisabled(false);
        } else {
            setSaveDisabled(true);
        }
    }, [changes])

    function fetchTableData() {
        const parsedOffsetDate = parseDate(offsetDate);
        const parsedLimitDate = parseDate(limitDate);

        getData(process.env.REACT_APP_HOST + `/api/weight-tracker/get-weight-data?offsetDate=${parsedOffsetDate}&limitDate=${parsedLimitDate}`)
            .then(data => {
                setAlert('');
                setPage(Math.ceil(data.data.length / 5));
                setWeightEntries(data.data);
            })
            .catch(err => {
                setAlert(err.message);
            })
    }

    function saveChanges() {
        putData(process.env.REACT_APP_HOST + `/api/weight-tracker/edit-weights`, changes)
            .then(data => {
                fetchTableData();
                setChanges({});
            }, err => {
                setAlert(err.message);
            })
    }

    return (
        <>
            <div className={styles.toolbar}>
                <div className={styles.datesContainer}>
                    <div className={styles.dateSelect}>
                        <UGBLabel variant='subtitle2'>
                            From
                        </UGBLabel>
                        <UGBDatePicker
                            label=''
                            selectedDate={offsetDate}
                            setSelectedDate={setOffsetDate}
                            maxDate={maxDate}
                        />
                    </div>
                    <div className={styles.dateSelect}>
                        <UGBLabel variant='subtitle2'>
                            To
                        </UGBLabel>
                        <UGBDatePicker
                            label=''
                            selectedDate={limitDate}
                            setSelectedDate={setLimitDate}
                            maxDate={maxDate}
                        />
                    </div>
                </div>
                <UGBButton btnType='primary' disabled={saveDisabled} onClick={saveChanges}>
                    Save Changes
                </UGBButton>
            </div>
            <div className={styles.alert}>
                {alert ? <BrandAlert>{alert}</BrandAlert> : null}
            </div>
            <WeightEntriesTable
                headCells={headCells}
                rows={weightEntries}
                setRows={setWeightEntries}
                page={page}
                setPage={setPage}
                limitDate={maxDate}
                setChanges={setChanges}
            />
            <div className={styles.actions}>
                <UGBButton
                    type='submit'
                    btnType='secondary'
                    onClick={() => {
                        history.push(history.pathName);
                    }}
                >
                    Close
                </UGBButton>
            </div>
        </>
    );
}

const WeightTracker = ({ groupBy }) => {
    const styles = useStyles();
    const history = useHistory();
    const { tab } = useQuery();
    const [weightEntries, setWeightEntries] = useState([]);
    const [barChartLabels, setBarChartLabels] = useState([]);
    const [lineChartLabels, setLineChartLabels] = useState([]);
    const [barChartValues, setBarChartValues] = useState([]);
    const [lineChartValues, setLineChartValues] = useState([]);
    const [avgWeightIncrementor, setAvgWeightIncrementor] = useState(0);
    const [chartWidth, setChartWidth] = useState('100%');
    const [barChartHasBars, setBarChartHasBars] = useState(false);
    const [showWeightEntriesTable, setShowWeightEntriesTable] = useState(false);
    const [alert, setAlert] = useState('');

    useEffect(() => {
        getData(process.env.REACT_APP_HOST + `/api/weight-tracker/get-weight-chart-data-by-${groupBy}`)
            .then(data => {
                setAlert('');
                if (data.data.length) {
                    setBarChartHasBars(true);
                } else {
                    setBarChartHasBars(false);
                }
                setWeightEntries(data.data);
            })
            .catch(err => {
                setAlert(err.message);
            })
    }, [groupBy]);

    useEffect(() => {
        setAvgWeightIncrementor(weightEntries[0] ? weightEntries[0].avgWeight : 0);
        const tempBarChartLabels = [];
        const tempBarChartValues = [];
        const tempLineChartLabels = [];
        const lineChartValues = [];

        for (let i = 0; i < weightEntries.length; i++) {
            const week = weightEntries[i].startDate + '|' + weightEntries[i].endDate;
            tempLineChartLabels.push(week);
            lineChartValues.push(weightEntries[i].avgWeight - weightEntries[0].avgWeight);
            if (i !== 0) {
                tempBarChartValues.push(weightEntries[i].weightChange);
                tempBarChartLabels.push(week);
            }
        }

        const reversedTempBarChartLabels = [];
        const reversedTempBarChartValues = [];

        for (let i = tempBarChartLabels.length - 1; i >= 0; i--) {
            reversedTempBarChartLabels.push(tempBarChartLabels[i]);
            reversedTempBarChartValues.push(tempBarChartValues[i]);
        }

        setChartWidth(getBarChartWidth(lineChartValues.length));
        setLineChartLabels(tempLineChartLabels);
        setLineChartValues(lineChartValues);
        setBarChartLabels(reversedTempBarChartLabels);
        setBarChartValues(reversedTempBarChartValues);
    }, [weightEntries]);

    useEffect(() => {
        switch (tab) {
            case 'edit-weight-entries':
                setShowWeightEntriesTable(true);
                break;
            default:
                setShowWeightEntriesTable(false);
                break;
        }
    }, [tab])

    return (
        <>
            <>
                <UGBModal
                    open={showWeightEntriesTable}
                    onClose={() => {
                        history.push(window.location.pathname);
                        setShowWeightEntriesTable(false);
                    }}
                    maxWidth='xl'
                    hasPadding={true}
                >
                    <EditWeightEntries />
                </UGBModal>
            </>
            <div className={styles.charts}>
                <div className={styles.barChart}>
                    <div className={styles.chartLabel}>
                        <UGBLabel variant='h6'>
                            Weight Change(%) Tracker:
                        </UGBLabel>
                    </div>
                    <div style={{ width: chartWidth }}>
                        <UGBVerticalBarsChart
                            tooltipLabel='Weight Change'
                            hoverTooltipLabel='%'
                            colorTop='#3DA1D7'
                            colorBottom={!barChartHasBars ? '#3DA1D7' : undefined}
                            height='250px'
                            type='bar'
                            chartLabels={barChartLabels}
                            chartValues={barChartValues}
                            incrementor={0}
                        />
                    </div>
                    <hr
                        style={barChartHasBars ?
                            { width: `calc(${chartWidth} - 67px)` }
                            :
                            { width: `calc(${chartWidth} - 52px)` }
                        }
                        className={clsx(
                            styles.chartLine,
                            barChartHasBars ?
                                styles.fullBarChartChartLine
                                :
                                styles.emptyBarChartChartLine
                        )}
                    />
                </div>
                <div className={styles.lineChart}>
                    <div className={styles.chartLabel}>
                        <UGBLabel variant='h6'>
                            Average Weight Tracker:
                        </UGBLabel>
                    </div>
                    <UGBVerticalBarsChart
                        tooltipLabel='Average Weight'
                        hoverTooltipLabel=' kg'
                        colorTop='#3DA1D7'
                        colorBottom='#3DA1D7'
                        height='250px'
                        type='line'
                        chartLabels={lineChartLabels}
                        chartValues={lineChartValues}
                        incrementor={avgWeightIncrementor}
                    />
                </div>
            </div>
        </>
    );
};

export default WeightTracker;