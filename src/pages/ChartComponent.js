import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Chart from "chart.js/auto";

const ChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((_, index) => `Data ${index}`),
        datasets: [
          {
            label: "Random Data",
            data: data,
            borderColor: "rgb(75, 192, 192)",
          },
        ],
      },
      options: {},
    });
  }, [data]);

  return (
    <div>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default ChartComponent;
