import React from "react";
import WebcamComponent from "../components/WebcamComponent";
import MyHeader from "../components/MyHeader";
import VideoUploader from "../components/ViedoUploader";

const DashCamView = () => {
  return (
    <div className="DashCamView">
      <WebcamComponent width={640} height={360} />
    </div>
  );
};

export default DashCamView;
