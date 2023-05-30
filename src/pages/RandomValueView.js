import React from "react";

const RandomValueView = ({ value }) => {
  const className = parseInt(value) > 50 ? "Anomaly_true" : "Anomaly";

  return (
    <div className="RandomValueView">
      <h1>Anomaly Score</h1>
      <div key={value} className={className}>
        <h1>{value}</h1>
      </div>
    </div>
  );
};

export default RandomValueView;
