import { Peer } from "peerjs";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const VideoChat = ({ roomId }) => {
  const navigate = useNavigate();
  const videoGridRef = useRef(null);

  useEffect(() => {
    if (!roomId) return navigate("/matchmaking");
    const peer = new Peer();
    const token = window.localStorage.getItem("token");
    const socket = io(`${process.env.REACT_APP_VIDEO_SERVICE_HOST}`, {
      query: { roomId, token },
      path: "/api/video-service",
    });

    videoGridRef.current.innerHTML = "";
    const userVideo = document.createElement("video");
    const matchedUserVideo = document.createElement("video");
    userVideo.muted = true;
    userVideo.style.width = "50%";
    userVideo.style.height = "200px";
    videoGridRef.current.appendChild(userVideo);

    const startMediaDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        userVideo.srcObject = stream;
        userVideo.addEventListener("loadedmetadata", () => {
          userVideo.play();
        });

        const attachCallListeners = (call) => {
          call.on("stream", (matchedUserVideoStream) => {
            matchedUserVideo.srcObject = matchedUserVideoStream;
            matchedUserVideo.addEventListener("loadedmetadata", () => {
              matchedUserVideo.play();
            });
            matchedUserVideo.style.width = "50%";
            matchedUserVideo.style.height = "200px";
            videoGridRef.current.appendChild(matchedUserVideo);
          });

          call.on("close", () => {
            matchedUserVideo.remove();
            const stream = matchedUserVideo.srcObject;
            const tracks = stream.getTracks();
            for (var i = 0; i < tracks.length; i++) {
              var track = tracks[i];
              track.stop();
            }
            matchedUserVideo.srcObject = null;
          });
        };

        peer.on("call", (call) => {
          call.answer(stream);
          attachCallListeners(call);
        });

        socket.on("call-peer", (peerId) => {
          const call = peer.call(peerId, stream);
          attachCallListeners(call);
        });

        socket.emit("broadcast-peer-id", peer.id);
      } catch (error) {
        console.error(error);
      }
    };

    startMediaDevices();

    return async () => {
      peer.disconnect();
      socket.disconnect();

      const stream = userVideo.srcObject;
      const tracks = stream.getTracks();
      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
      }
      userVideo.srcObject = null;
    };
  }, [navigate, roomId]);

  return <div id="videos" ref={videoGridRef}></div>;
};

export default VideoChat;
