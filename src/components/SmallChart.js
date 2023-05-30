import ReactPlayer from "react-player";
import Chart from "chart.js/auto";
import React, { useEffect, useState, useRef } from "react";
import DashCamView from "../pages/DashCamView";
import RandomValueView from "../pages/RandomValueView";

const SmallChart = ({ video_url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [anomalyProbabilities, setAnomalyProbabilities] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const chartRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Real-time Data",
            data: [],
            borderColor: "rgb(255, 0, 0)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            min: 0,
            max: 10,
            ticks: {
              stepSize: 0.1, // Set the step size to 0.1 seconds
            },
          },
          y: {
            display: true,
            min: 0,
            max: 130,
          },
        },
        animation: {
          duration: 0, // Disable animation for immediate update
        },
      },
    });

    chartRef.current.chart = chart;
    return () => {
      chart.destroy();
    };
  }, []);

  useEffect(() => {
    const updateChart = () => {
      const chart = chartRef.current.chart;
      if (chart) {
        if (!chart.data.labels) {
          chart.data.labels = [];
        }
        if (chart.data.labels.length >= 10) {
          // Remove older data
          chart.data.labels.shift();
          chart.data.datasets[0].data.shift();
        }
        chart.data.labels.push(currentTime.toFixed(1)); // Add current time
        chart.data.datasets[0].data.push(anomalyProbabilities[0]);
        console.log(anomalyProbabilities);
        console.log(anomalyProbabilities[0]);
        chart.update();
        setAnomalyProbabilities((prevProbabilities) =>
          prevProbabilities.slice(1)
        );
      }
    };

    intervalRef.current = setInterval(updateChart, 100);
    const interval = setInterval(
      () => setCurrentTime((prevTime) => prevTime + 0.1),
      100
    );

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(interval);
    };
  }, [anomalyProbabilities, currentTime]);

  const handlePlay = () => {
    setIsPlaying(true);
    console.log("The video is playing.");

    const storedProbabilities = localStorage.getItem("anomaly_probabilities");
    if (storedProbabilities) {
      const parsedProbabilities = JSON.parse(storedProbabilities);
      setAnomalyProbabilities(parsedProbabilities);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    console.log("The video is paused.");
  };

  return (
    <div>
      <RandomValueView value={anomalyProbabilities[0]} />
      <div className="App_Chart">
        <canvas ref={chartRef} width="200" height="100"></canvas>
      </div>
      <button onClick={handlePlay}>Play</button>
    </div>
  );
};

export default SmallChart;
