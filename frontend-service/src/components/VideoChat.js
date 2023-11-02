import React, { useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";
import { io } from "socket.io-client";
import { useSearchParams } from "react-router-dom";

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
}

const VideoChat = () => {
  const [searchParams] = useSearchParams();
  
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(searchParams.get("roomId"));
  const [videoElements, setVideoElements] = useState([]);

  const videoGridRef = useRef(null);

  useEffect(() => {
   

    const peer = new Peer();
    peer.on("open", (id) => {
      console.log('My peer ID is: ' + id);
      setPeerId(id);  
    });
    setPeer(peer);
    setSocket(io(`${process.env.REACT_APP_VIDEO_SERVICE_HOST}`))
  }, []);

  useEffect(() => {
    if (!socket || !peer || !peerId ) return;

    const userVideo = document.createElement("video");
    userVideo.muted = true;
    const matchedUserVideo = document.createElement("video");

    const startMediaDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        addVideoStream(userVideo, stream);
        setVideoElements([userVideo]);

        peer.on('call', (call) => {
          call.answer(stream);

          call.on('stream', (matchedUserVideoStream) => {
            
            addVideoStream(matchedUserVideo, matchedUserVideoStream);
            setVideoElements([userVideo, matchedUserVideo]);
          });

          call.on('close', () => {
            matchedUserVideo.remove();
            setVideoElements([userVideo]);
          })
        });

        socket.on("user-connected", (userId) => {
          console.log(`[${userId}] User ${userId} has joined the room ${roomId}.`);
          const call = peer.call(userId, stream);
          
          call.on('stream', (matchedUserVideoStream) => {
            addVideoStream(matchedUserVideo, matchedUserVideoStream);
            setVideoElements([userVideo, matchedUserVideo]);
          });
          
          call.on('close', () => {
            matchedUserVideo.remove();
            setVideoElements([userVideo]);

          })
        });

        // socket.on("user-disconnected", (userId) => {
          
        // })


        socket.emit("join-server", {
          peerId: peerId,
          roomId: roomId
        });
        console.log(`User ${peerId} is attemping to join video-server.`);

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


  }, [socket, peer, peerId, roomId]);

  useEffect(() => {
    if (videoGridRef.current == null) return;
    for (let videoElem of videoElements) {
      videoElem.style.width = '250px'
      videoElem.style.height = '250px'
      videoElem.style.margin = '10px'
      videoGridRef.current.appendChild(videoElem);
    }
  }, [videoElements]);

  return <div id="videos" ref={videoGridRef}></div>;
};

export default VideoChat;
