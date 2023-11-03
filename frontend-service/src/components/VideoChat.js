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
  const [videos, setVideos] = useState([]);

  const videoGridRef = useRef(null);

  useEffect(() => {

    const peer = new Peer();
    peer.on("open", (id) => {
      console.log('My peer ID is: ' + id);
      setPeerId(id);
    });
    setPeer(peer);
    setSocket(io(`${process.env.REACT_APP_VIDEO_SERVICE_HOST}`), {
      path: "/api/video-service",
    })
  }, []);

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on("able-to-join-server-now", () => {
  //     socket.emit("join-server", {
  //       peerId: peerId,
  //       roomId: roomId
  //     });
  //     console.log(`User ${peerId} is attemping to join video-server.`);
  //     // if (!socket || !peer || !peerId) return;

  //     const userVideo = document.createElement("video");
  //     userVideo.muted = true;
  //     const matchedUserVideo = document.createElement("video");

  //     const startMediaDevices = async () => {
  //       try {
  //         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  //         console.log("hi")
  //         addVideoStream(userVideo, stream);
  //         setVideos([userVideo]);

  //         peer.on('call', (call) => {
  //           call.answer(stream);

  //           call.on('stream', (matchedUserVideoStream) => {

  //             addVideoStream(matchedUserVideo, matchedUserVideoStream);
  //             setVideos([userVideo, matchedUserVideo]);
  //           });

  //           call.on('close', () => {
  //             matchedUserVideo.remove();
  //             setVideos([userVideo]);
  //           })
  //         });

  //         socket.on("user-connected", (userId) => {
  //           console.log(`User ${userId} has joined the room ${roomId}.`);
  //           const call = peer.call(userId, stream);

  //           call.on('stream', (matchedUserVideoStream) => {
  //             addVideoStream(matchedUserVideo, matchedUserVideoStream);
  //             setVideos([userVideo, matchedUserVideo]);
  //           });

  //           call.on('close', () => {
  //             matchedUserVideo.remove();
  //             setVideos([userVideo]);

  //           })
  //         });


  //         socket.on("able-to-leave-server-now", () => {
  //           if (!peer) return;
  //           peer.close();
  //           setVideos([]);
  //           console.log(`User ${peerId} is attemping to leave video-server.`)
  //           socket.emit("user-disconnected", peerId, roomId);
  //         })
  //         // socket.on("user-disconnected", (userId) => {

  //         // })




  //       } catch (error) {
  //         console.error('Error accessing media devices.', error);
  //       }
  //     };

  //     startMediaDevices();

  //   })
  // }, []);

  useEffect(() => {
    if (!socket || !peer || !peerId) return;

    const userVideo = document.createElement("video");
    userVideo.muted = true;
    const matchedUserVideo = document.createElement("video");

    const startMediaDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        addVideoStream(userVideo, stream);
        setVideos([userVideo]);
        console.log("user video has been set up");
        peer.on('call', (call) => {
          call.answer(stream);

          call.on('stream', (matchedUserVideoStream) => {

            addVideoStream(matchedUserVideo, matchedUserVideoStream);
            setVideos([userVideo, matchedUserVideo]);
            console.log("matchedUser video has been set up");
          });

          call.on('close', () => {
            matchedUserVideo.remove();
            setVideos([userVideo]);
          })
        });

        socket.on("user-connected", (userId) => {
          console.log(`User ${userId} has joined the room ${roomId}.`);
          const call = peer.call(userId, stream);

          call.on('stream', (matchedUserVideoStream) => {
            addVideoStream(matchedUserVideo, matchedUserVideoStream);
            setVideos([userVideo, matchedUserVideo]);
            console.log(`User and matched user videos are up`);
          });  

          call.on('close', () => {
            matchedUserVideo.remove();
            setVideos([userVideo]);
            
          })
           
        });


        // socket.on("able-to-leave-server-now", () => {
        //   if (!peer) return;
        //   peer.close();
        //   setVideos([]);
        //   console.log(`User ${peerId} is attemping to leave video-server.`)
        //   socket.emit("user-disconnected", peerId, roomId);
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

 
  }, [socket, peer ]); 

  useEffect(() => { 
    if (videoGridRef.current == null) return; 

    videos.map((video) => {
      video.style.width = '300px'
      video.style.height = '300px'
      video.style.margin = '10px'
      videoGridRef.current.appendChild(video);
      return video;
    });
  }, [videos]);

  return <div id="videos" ref={videoGridRef}></div>;

};

export default VideoChat;
