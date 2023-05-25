import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Graph = ({ data }) => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    // 1초마다 데이터 업데이트
    const interval = setInterval(() => {
      // data를 새로운 배열로 복사한 뒤에 새로운 값을 추가
      setGraphData((prevData) => [...prevData, data]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <LineChart width={500} height={300} data={graphData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
};

export default Graph;
