import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const Home2 = ({ anomaly_value }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: [], // array of labels for X-axis
        datasets: [
          {
            label: "Anomaly Value",
            data: [], // array of data points for Y-axis
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Time",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Value",
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  useEffect(() => {
    if (anomaly_value !== "") {
      const chart = chartRef.current.chart;
      chart.data.labels.push(""); // add a new label for each data point received
      chart.data.datasets[0].data.push(anomaly_value); // add the received value to the dataset
      chart.update(); // update the chart to reflect the new data
    }
  }, [anomaly_value]);

  return <canvas ref={chartRef} />;
};

export default Home2;
