import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import io from "socket.io-client";
import "./App.css";

const App = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    // 소켓 연결
    const socket = io("http://localhost:8888");
    console.log("시바 useEffect");

    // 서버로부터 데이터 수신 시 처리
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("random_number", (data) => {
      setValue(data);
      console.log("시발", data);
    });

    return () => {
      // 컴포넌트 언마운트 시 소켓 연결 종료
      // socket.disconnect();
      console.log("시바");
    };
  }, []);

  return (
    <div>
      <Home anomaly_value={value} />
      <h1>{value}</h1>
    </div>
  );
};

export default App;
