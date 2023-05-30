import React, { useRef, useEffect, useState } from "react";
import VideoUploader from "./ViedoUploader";
import VideoPlayer from "./VideoPlayer";
import SmallChart from "./SmallChart";

const WebcamComponent = ({ width, height }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => {
    if (cameraOn) {
      const constraints = { video: { width: width, height: height } }; // 720p 해상도 설정

      // 웹캠 영상 가져오기
      const getWebcamStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
          }
        } catch (error) {
          console.error("Error accessing webcam:", error);
        }
      };

      getWebcamStream();
    }

    // 컴포넌트 언마운트 시 웹캠 스트림 해제
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, [cameraOn, width, height]);

  const handleToggleCamera = () => {
    if (cameraOn) {
      setCameraOn(false);
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
        streamRef.current = null;
        videoRef.current.srcObject = null;
      }
    } else {
      setCameraOn(true);
    }
  };

  return (
    <div className="WebcamComponent">
      <>
        {cameraOn ? (
          <>
            <div className="realtime_detect">
              <video
                ref={videoRef}
                className="WebCamComponent_video"
                autoPlay
              />
              <button className="btn_realtime_no" onClick={handleToggleCamera}>
                <h4>실시간 탐지 모드 사용 종료</h4>
              </button>
            </div>
            <SmallChart />
          </>
        ) : (
          <div className="recorded_video">
            <VideoUploader />
            <button className="btn_realtime_yes" onClick={handleToggleCamera}>
              <h4>실시간 탐지 모드 사용</h4>
            </button>
          </div>
        )}
      </>
      {/* <VideoPlayer video_url={"http://localhost:8888/download/test2.mp4"} /> */}
    </div>
  );
};

export default WebcamComponent;
