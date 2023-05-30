import Chart from "chart.js/auto";
import io from "socket.io-client";
import React, { useEffect, useState, useRef } from "react";
import Home from "./Home";
const ChartComponent = () => {
  const [value, setValue] = useState("");
  const [sendValues, setSendValues] = useState(false); // Flag variable to control sending of random values
  const chartRef = useRef(null);
  const socketRef = useRef(null);

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
    </>
  );
};

export default ChartComponent;
