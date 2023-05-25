import React from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Dashboard = () => {
  return (
    <div>
      <MyHeader
        headText={"?"}
        leftChild={<MyButton text={"<"} onClick={() => {}} />}
        rightChild={<MyButton text={">"} onClick={() => {}} />}
      />
    </div>
  );
};

export default Dashboard;
