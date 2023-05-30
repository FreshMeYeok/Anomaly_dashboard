import React, { useState } from "react";
import axios from "axios";
import VideoPlayer from "./VideoPlayer";

const VideoUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(""); // 영상 URL을 저장하는 변수

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setLoading(true);

      const formData = new FormData();
      formData.append("video", selectedFile);

      axios
        .post("http://localhost:8888/upload", formData)
        .then((response) => {
          // 업로드 성공 시에 대한 처리
          console.log("Video uploaded successfully!");
          setVideoUrl(response.data.url); // 업로드한 영상의 URL을 저장
          console.log(response.data.anomaly_probabilities);
          localStorage.setItem(
            "anomaly_probabilities",
            JSON.parse(JSON.stringify(response.data.anomaly_probabilities))
          );
        })
        .catch((error) => {
          // 업로드 실패 시에 대한 처리
          console.error("Error uploading video:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="VideoUploader">
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {loading && <div>Loading...</div>}

      {videoUrl && (
        <div className="VideoPlayer">
          <VideoPlayer video_url={videoUrl} />
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
