import React, { useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const VideoChat = () => {
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState(null);
  const [socket, setSocket] = useState(null);

  const videoGridRef = useRef(null);

  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    videoGridRef.current.appendChild(video);
  }

  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (id) => {
      setPeerId(id);
    });
    setPeer(peer);
    setSocket(io("http://localhost:3004"))
  }, []);

  useEffect(() => {
    if (!socket) return;
    if (!peer || !peerId) return;

    const userVideo = document.createElement("video");
    userVideo.muted = true;
    const matchedUserVideo = document.createElement("video");

    const startMediaDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        addVideoStream(userVideo, stream);

        peer.on('call', (call) => {
          call.answer(stream);

          call.on('stream', (matchedUserVideoStream) => {
            addVideoStream(matchedUserVideo, matchedUserVideoStream);
          });

          call.on('close', () => {
            matchedUserVideo.remove();
          })
        });

        socket.on('joinedRoom', (notif) => {
          const { roomID, user } = notif;
          const call = peer.call(user, stream);
          call.on('stream', (matchedUserVideoStream) => {
            addVideoStream(matchedUserVideo, matchedUserVideoStream);
          });

          call.on('close', () => {
            userVideo.remove();
          })
        });
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    startMediaDevices();

    // socket.on('user-disconnected', (userId) => {
    //   if (peers[userId]) {
    //     peers[userId].close();
    //   }
    // });

    // myPeer.on('open', (id) => {
    //   socket.emit('join-room', ROOM_ID, id);
    // });
  }, []);

  return <div id="videos" ref={videoGridRef}></div>;
};

export default VideoChat;
