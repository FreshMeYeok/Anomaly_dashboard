import React from "react";
import WebcamComponent from "../components/WebcamComponent";
import MyHeader from "../components/MyHeader";

const DashCamView = () => {
  return (
    <div className="DashCamView">
      {/* <MyHeader
        headText="DashCam View"
        leftChild={<WebcamComponent width={1280} height={720} />}
        rightChild={<WebcamComponent width={1920} height={1080} />}
      /> */}
      <WebcamComponent width={640} height={360} />
    </div>
  );
};

export default DashCamView;
