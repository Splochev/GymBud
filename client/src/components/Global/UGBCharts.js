import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { parseDate } from '../utils/utilFunc';
Chart.register(...registerables);

const useStyles = makeStyles((theme) => ({
    canvasContainer250px: {
        height: '250px',
        width:'100%'
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

export function UGBVerticalBarsChart({ type, chartLabels, chartValues, tooltipLabel, color, height, ...props }) {
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
                        let label = `${context[0].raw} kg\n${startDate} - ${endDate}`;
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
                            return `${value.toFixed(2)} kg`;
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
                    borderColor: color,
                    drawTicks: false,
                    display: false,
                },
            },
            x: {
                grid: {
                    drawTicks: false,
                    borderColor: color,
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
