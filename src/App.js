// import React, { useEffect, useState, useRef } from "react";
// import Chart from "chart.js/auto";
// import io from "socket.io-client";
// import "./App.css";
// import Home from "./pages/Home";
// const App = () => {
//   const [value, setValue] = useState("");
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const socket = io("http://localhost:8888");

//     // Initialize the chart when the component mounts
//     const ctx = chartRef.current.getContext("2d");
//     const chart = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: [],
//         datasets: [
//           {
//             label: "Real-time Data",
//             data: [],
//             borderColor: "rgb(75, 192, 192)",
//             tension: 0.1,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         scales: {
//           x: {
//             display: true,
//           },
//           y: {
//             display: true,
//           },
//         },
//       },
//     });

//     socket.on("connect", () => {
//       console.log("Connected to server");
//     });

//     socket.on("random_number", (data) => {
//       // Update the value and add a new data point to the chart
//       setValue(data);
//       chart.data.labels.push(new Date().toLocaleTimeString());
//       chart.data.datasets[0].data.push(data);
//       chart.update(); // Update the chart to reflect the new data
//     });

//     return () => {
//       // Cleanup function to disconnect the socket and destroy the chart
//       socket.disconnect();
//       chart.destroy();
//     };
//   }, []);

//   return (
//     <div>
//       <Home anomaly_value={value} />
//       <div className="App_Chart">
//         <canvas ref={chartRef} width="200" height="100"></canvas>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState, useRef } from "react";

import "./App.css";
import ChartComponent from "./pages/ChartComponent";

const App = () => {
  return (
    <div>
      {/* <Home anomaly_value={value} /> */}
      {/* <div className="App_Chart">
        <canvas ref={chartRef} width="200" height="100"></canvas>
      </div>
      <button onClick={handleButtonClick}>
        {sendValues ? "Stop Sending Values" : "Start Sending Values"}
      </button> */}
      <ChartComponent />
    </div>
  );
};

export default App;
