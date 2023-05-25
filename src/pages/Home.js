import React from "react";
import DashCamView from "./DashCamView";
import RandomValueView from "./RandomValueView";

const Home = ({ anomaly_value }) => {
  return (
    <div className="Home">
      <DashCamView />
      {/* <RealtimeChart data={anomaly_value} /> */}
      {/* <h1>Random value:{anomaly_value}</h1> */}
      <RandomValueView value={anomaly_value} />
    </div>
  );
};

export default Home;
