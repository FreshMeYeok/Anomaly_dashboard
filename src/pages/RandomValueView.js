import React from "react";

const RandomValueView = ({ value }) => {
  return (
    <div className="RandomValueView">
      <h1>Anomaly</h1>
      <div className="AnomalyScore_view">
        <h1>{value}</h1>
      </div>
    </div>
  );
};

export default RandomValueView;
