import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

function LineChart(props) {
    const chartRef = useRef(null);
    const { data, labels, update, set } = props;
    useEffect(() => {
        const myCharRef = chartRef.current.getContext('2d');

        if (window.myCharts !== undefined) {
            window.myCharts.destroy();
        }
        window.myCharts = new Chart(myCharRef, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Temperatura',
                        data: data,
                        backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)'],
                        fill: false,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                animation: {
                    duration: 0,
                },
                responsive: true,
                title: {
                    display: true,
                    text: 'Quarto Gabriel',
                },
            },
        });
        set(false);
    }, [update]); // eslint-disable-line
    return <canvas ref={chartRef}></canvas>;
}

export default LineChart;
