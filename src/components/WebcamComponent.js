// import React, { useRef, useEffect } from "react";

// const WebcamComponent = () => {
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);

//   useEffect(() => {
//     const constraints = { video: true };

//     // 웹캠 영상 가져오기
//     const getWebcamStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia(constraints);
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           streamRef.current = stream;
//         }
//       } catch (error) {
//         console.error("Error accessing webcam:", error);
//       }
//     };

//     getWebcamStream();

//     // 컴포넌트 언마운트 시 웹캠 스트림 해제
//     return () => {
//       if (streamRef.current) {
//         const tracks = streamRef.current.getTracks();
//         tracks.forEach((track) => {
//           track.stop();
//         });
//       }
//     };
//   }, []);

//   const handleToggleCamera = () => {
//     if (streamRef.current) {
//       const tracks = streamRef.current.getTracks();
//       tracks.forEach((track) => {
//         track.stop();
//       });
//       streamRef.current = null;
//       videoRef.current.srcObject = null;
//     } else {
//       const constraints = { video: true };
//       const getWebcamStream = async () => {
//         try {
//           const stream = await navigator.mediaDevices.getUserMedia(constraints);
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//             streamRef.current = stream;
//           }
//         } catch (error) {
//           console.error("Error accessing webcam:", error);
//         }
//       };
//       getWebcamStream();
//     }
//   };

//   return (
//     <div className="WebcamComponent">
//       <video ref={videoRef} className="WebCamComponent video" autoPlay />
//       <button onClick={handleToggleCamera}>
//         {streamRef.current ? "Turn Off Camera" : "Turn On Camera"}
//       </button>
//     </div>
//   );
// };

// export default WebcamComponent;

import React, { useRef, useEffect } from "react";

const WebcamComponent = ({ width, height }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
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

    // 컴포넌트 언마운트 시 웹캠 스트림 해제
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const handleToggleCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
      videoRef.current.srcObject = null;
    } else {
      const constraints = { video: { width: 1280, height: 720 } }; // 720p 해상도 설정
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
  };

  return (
    <div className="WebcamComponent">
      <video ref={videoRef} className="WebCamComponent video" autoPlay />
      <button onClick={handleToggleCamera}>
        {streamRef.current ? "Turn Off Camera" : "Turn On Camera"}
      </button>
    </div>
  );
};

export default WebcamComponent;
