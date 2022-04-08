import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { parseDate } from '../utils/utilFunc';
import CircularProgress from '@material-ui/core/CircularProgress';
import UGBLabel from './UGBLabel';
import { useState } from 'react';
import { useEffect } from 'react';
Chart.register(...registerables);

const useStyles = makeStyles((theme) => ({
    canvasContainer250px: {
        height: theme.spacing(31.25),
        width: '100%'
    }
}));

let width, height, gradient;
function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, '#218838');
        gradient.addColorStop(1, '#28A745');
    }

    return gradient;
}

export function UGBVerticalBarsChart({
    type,
    chartLabels,
    chartValues,
    tooltipLabel,
    hoverTooltipLabel,
    colorTop,
    colorBottom,
    height,
    incrementor,
    ...props }) {
    const styles = useStyles();


    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                type: type,
                order: 1,
                label: tooltipLabel,
                data: chartValues,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                    }
                    return getGradient(ctx, chartArea);
                },
                borderColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                    }
                    return getGradient(ctx, chartArea);
                },
                borderWidth: 1,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        barPercentage: 1,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        return '';
                    },
                    title: function (context) {
                        const week = context[0].label.split('|');
                        const startDate = parseDate(new Date(week[0]), '/');
                        const endDate = parseDate(new Date(week[1]), '/');
                        let label = `${context[0].raw + Number(incrementor)}${hoverTooltipLabel}\n${startDate} - ${endDate}`;
                        return label;
                    }
                },
                titleFont: {
                    size: 16
                },
                titleMarginBottom: 0
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, values) {
                        try {
                            return `${(Number(incrementor) + value).toFixed(2)}${hoverTooltipLabel}`;
                        } catch (err) {
                            return '';
                        }
                    },
                    color: 'black',
                    font: {
                        size: 16
                    },
                },
                grid: {
                    borderColor: colorTop,
                    drawTicks: false,
                    display: false,
                },
            },
            x: {
                grid: {
                    drawTicks: false,
                    borderColor: colorBottom,
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return '';
                    }
                },
            }

        },
    };

    return (
        <div className={styles[`canvasContainer${height}`]}>
            <Bar data={chartData} options={options} />
        </div>
    );
}

const useCircularProgressWithLabelStyles = makeStyles((theme) => ({
    innerBox: {
        top: 135,
        bottom: 0,
        left: 3,
        right: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
    },
    outerBox: {
        position: "relative",
        display: "inline-flex",
    },
    fillCircle: {
        width: '200px !important',
        height: '200px !important',
        color: '#DFF2E3',
    },
    innerCircle: {
        width: '200px !important',
        height: '200px !important',
        transform: 'rotate(126deg) !important',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        color: '#28A745'
    },
    emptyCircle: {
        width: '201px !important',
        height: '201px !important',
        transform: 'rotate(54.4deg) !important',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        color: 'white'
    },
    arrowContainer: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    arrow: {
        height: 0,
        width: 0,
        borderLeft: '3px solid transparent',
        borderRight: '3px solid transparent',
        borderBottom: '65px solid #1B1B1B',
    },
    innerBoxLeft: {
        top: 0,
        bottom: -13,
        right: 0,
        left: 5,
        zIndex: 2,
        position: "absolute",
        display: "flex",
        alignItems: "end",
        justifyContent: "left",
    },
    innerBoxRight: {
        top: 0,
        bottom: -13,
        right: 5,
        left: 0,
        zIndex: 2,
        position: "absolute",
        display: "flex",
        alignItems: "end",
        justifyContent: "right",
    },
    innerBoxCenter: {
        top: 0,
        bottom: -50,
        right: 0,
        left: 0,
        zIndex: 2,
        position: "absolute",
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "end",

    }
}));

const degrees = {
    0: "rotate(-144deg)",
    1: "rotate(-141deg)",
    2: "rotate(-138deg)",
    3: "rotate(-135.5deg)",
    4: "rotate(-132.5deg)",
    5: "rotate(-130deg)",
    6: "rotate(-127deg)",
    7: "rotate(-124deg)",
    8: "rotate(-121deg)",
    9: "rotate(-118deg)",
    10: "rotate(-115deg)",
    11: "rotate(-112deg)",
    12: "rotate(-109.5deg)",
    13: "rotate(-106.5deg)",
    14: "rotate(-104deg)",
    15: "rotate(-101deg)",
    16: "rotate(-98deg)",
    17: "rotate(-95deg)",
    18: "rotate(-92deg)",
    19: "rotate(-89.5deg)",
    20: "rotate(-86.5deg)",
    21: "rotate(-83.5deg)",
    22: "rotate(-80.5deg)",
    23: "rotate(-78deg)",
    24: "rotate(-75deg)",
    25: "rotate(-72deg)",
    26: "rotate(-69deg)",
    27: "rotate(-66deg)",
    28: "rotate(-63.5deg)",
    29: "rotate(-60.5deg)",
    30: "rotate(-57.5deg)",
    31: "rotate(-54.5deg)",
    32: "rotate(-52deg)",
    33: "rotate(-49deg)",
    34: "rotate(-46deg)",
    35: "rotate(-43deg)",
    36: "rotate(-40deg)",
    37: "rotate(-37deg)",
    38: "rotate(-34.deg)",
    39: "rotate(-31.5deg)",
    40: "rotate(-28.5deg)",
    41: "rotate(-25.5deg)",
    42: "rotate(-22.5deg)",
    43: "rotate(-20deg)",
    44: "rotate(-17deg)",
    45: "rotate(-14deg)",
    46: "rotate(-11.5deg)",
    47: "rotate(-8.5deg)",
    48: "rotate(-5.5deg)",
    49: "rotate(-3deg)",
    50: "rotate(0deg)",
    51: "rotate(3deg)",
    52: "rotate(6deg)",
    53: "rotate(9deg)",
    54: "rotate(11.5deg)",
    55: "rotate(14.5deg)",
    56: "rotate(17deg)",
    57: "rotate(20deg)",
    58: "rotate(23deg)",
    59: "rotate(26deg)",
    60: "rotate(28.5deg)",
    61: "rotate(31.5deg)",
    62: "rotate(34.5deg)",
    63: "rotate(37deg)",
    64: "rotate(40deg)",
    65: "rotate(43deg)",
    66: "rotate(46deg)",
    67: "rotate(49deg)",
    68: "rotate(51.5deg)",
    69: "rotate(54.5deg)",
    70: "rotate(57.5deg)",
    71: "rotate(60.5deg)",
    72: "rotate(63.5deg)",
    73: "rotate(66deg)",
    74: "rotate(69deg)",
    75: "rotate(72deg)",
    76: "rotate(75deg)",
    77: "rotate(78deg)",
    78: "rotate(80.5deg)",
    79: "rotate(83.5deg)",
    80: "rotate(86.5deg)",
    81: "rotate(89deg)",
    82: "rotate(92deg)",
    83: "rotate(95deg)",
    84: "rotate(98deg)",
    85: "rotate(100.5deg)",
    86: "rotate(103.5deg)",
    87: "rotate(106.5deg)",
    88: "rotate(109.5deg)",
    89: "rotate(112deg)",
    90: "rotate(115deg)",
    91: "rotate(118deg)",
    92: "rotate(121deg)",
    93: "rotate(123.5deg)",
    94: "rotate(126.5deg)",
    95: "rotate(129.5deg)",
    96: "rotate(132.5deg)",
    97: "rotate(135.5deg)",
    98: "rotate(138deg)",
    99: "rotate(141deg)",
    100: "rotate(144deg)",
}

function CircularProgressWithLabel({ progress, goalReached, currentValue, startValue, goalValue }) {
    const styles = useCircularProgressWithLabelStyles()
    return (
        <div>
            <div className={styles.outerBox}>
                <CircularProgress
                    variant="determinate"
                    classes={{ root: styles.innerCircle }}
                    thickness={7}
                    value={progress - progress * 0.2}
                />
                <CircularProgress
                    variant="determinate"
                    classes={{ root: styles.fillCircle }}
                    value={100}
                    thickness={7}
                />
                <CircularProgress
                    variant="determinate"
                    classes={{ root: styles.emptyCircle }}
                    value={20}
                    thickness={7.3}
                />
                <div className={styles.innerBox}>
                    <UGBLabel variant="h6">
                        {currentValue}
                    </UGBLabel>
                </div>
                <div className={styles.innerBoxLeft}>
                    <UGBLabel variant="h6">
                        {startValue}
                    </UGBLabel>
                </div>
                <div className={styles.innerBoxRight}>
                    <UGBLabel variant="h6">
                        {goalValue}
                    </UGBLabel>
                </div>
                {goalReached ?
                    <div className={styles.innerBoxCenter}>
                        <UGBLabel variant="h6" style={{ textAlign: 'center', color: '#28A745' }}>
                            Goal
                        </UGBLabel>
                        <UGBLabel variant="h6" style={{ textAlign: 'center', marginTop: -10, color: '#28A745' }}>
                            Reached!
                        </UGBLabel>
                    </div>
                    :
                    null
                }
                <div className={styles.arrowContainer}>
                    <div
                        style={{
                            height: 133,
                            transform: degrees[progress]
                        }}
                    >
                        <div className={styles.arrow} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CircularChart({ currentValue, startValue, goalValue, abbreviation }) {
    const [progress, setProgress] = useState(0);
    const [goalReached, setGoalReached] = useState(false);

    useEffect(() => {
        const goalValueToReach = Math.abs(goalValue - startValue);
        let tempProgress = 0

        if (goalValue > startValue) {
            
            if (currentValue < startValue) {
                setProgress(0);
                return;
            }

            tempProgress = Math.round(Math.abs(startValue - currentValue) / goalValueToReach * 100)
        } else {
            tempProgress = Math.round((startValue - currentValue) / goalValueToReach * 100)
        }

        if (tempProgress >= 100) {
            setProgress(100);
            setGoalReached(true);
            return;
        } else if (tempProgress <= 0) {
            setProgress(0);
            return;
        }

        setGoalReached(false);
        setProgress(tempProgress);
    }, [startValue, goalValue, currentValue])

    return <CircularProgressWithLabel
        progress={progress}
        goalReached={goalReached}
        startValue={startValue + abbreviation}
        currentValue={currentValue + abbreviation}
        goalValue={goalValue + abbreviation}
    />
}
