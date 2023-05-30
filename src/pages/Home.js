import React from "react";
import DashCamView from "./DashCamView";
import RandomValueView from "./RandomValueView";

const Home = ({ anomaly_value }) => {
  return (
    <div className="Home">
      <DashCamView />
      <RandomValueView value={anomaly_value} />
    </div>
  );
};

export default Home;
