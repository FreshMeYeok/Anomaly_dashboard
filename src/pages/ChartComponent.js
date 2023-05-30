import Chart from "chart.js/auto";
import io from "socket.io-client";
import React, { useEffect, useState, useRef } from "react";
import Home from "./Home";
const ChartComponent = () => {
  const [value, setValue] = useState("");
  const [sendValues, setSendValues] = useState(false); // Flag variable to control sending of random values
  const chartRef = useRef(null);
  const socketRef = useRef(null);

  // useEffect(() => {
  //   const socket = io("http://localhost:8888");
  //   socketRef.current = socket; // Store the socket reference in a ref

  //   // Initialize the chart when the component mounts
  //   const ctx = chartRef.current.getContext("2d");
  //   const chart = new Chart(ctx, {
  //     type: "line",
  //     data: {
  //       labels: [],
  //       datasets: [
  //         {
  //           label: "Real-time Data",
  //           data: [],
  //           borderColor: "rgb(255, 0, 0)",
  //           tension: 0.1,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       scales: {
  //         x: {
  //           display: true,
  //           min: 0,
  //           max: 50,
  //         },
  //         y: {
  //           display: true,
  //           max: 12,
  //         },
  //       },
  //     },
  //   });

  //   socket.on("connect", () => {
  //     console.log("Connected to server");
  //   });

  //   socket.on("random_number", (data) => {
  //     // Update the value and add a new data point to the chart
  //     setValue(data);
  //     if (chart.data.labels.length > 50) {
  //       // Remove the oldest label and data point if there are already 15 labels
  //       chart.data.labels.shift();
  //       chart.data.datasets[0].data.shift();
  //     }

  //     const currentTime = new Date();
  //     const minutes = currentTime.getMinutes();
  //     const seconds = currentTime.getSeconds();
  //     const milliseconds =
  //       Math.floor(currentTime.getMilliseconds() / 100) * 100;
  //     const formattedTime = `${minutes}:${seconds}.${currentTime.getMilliseconds()}`;
  //     chart.data.labels.push(formattedTime);
  //     chart.data.datasets[0].data.push(data);
  //     chart.update(); // Update the chart to reflect the new data
  //   });

  //   return () => {
  //     // Cleanup function to disconnect the socket and destroy the chart
  //     socket.disconnect();
  //     chart.destroy();
  //   };
  // }, []);

  const handleButtonClick = () => {
    setSendValues(!sendValues); // Toggle the flag variable when the button is clicked

    if (!sendValues) {
      // If sendValues is true, start sending values from the server
      socketRef.current.connect();
    } else {
      // If sendValues is false, stop sending values from the server
      socketRef.current.disconnect();
    }
  };

  return (
    <>
      <Home anomaly_value={value} />

      <button onClick={handleButtonClick}>
        {sendValues ? "Stop Sending Values" : "Start Sending Values"}
      </button>
    </>
  );
};

export default ChartComponent;
