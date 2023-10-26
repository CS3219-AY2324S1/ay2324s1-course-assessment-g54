import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';

const VideoChat = () => {
  const remoteVideoRef = useRef(null);
  const myVideoRef = useRef(null);
  const socket = io('/');
  const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001',
  });
  const peers = {};

  useEffect(() => {
    const startMediaDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        addVideoStream(myVideoRef.current, stream);

        myPeer.on('call', (call) => {
          call.answer(stream);
          
          call.on('stream', (userVideoStream) => {
            addVideoStream(remoteVideoRef.current, userVideoStream);
          });
        });

        socket.on('user-connected', (userId) => {
          connectToNewUser(userId, stream);
        });
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    startMediaDevices();

    socket.on('user-disconnected', (userId) => {
      if (peers[userId]) {
        peers[userId].close();
      }
    });

    myPeer.on('open', (id) => {
      socket.emit('join-room', ROOM_ID, id);
    });
  }, []);

  function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
      video.remove();
    });

    peers[userId] = call;
  }

  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    remoteVideoRef.current.appendChild(video);
  }

  return (
    <div>
      <video ref={remoteVideoRef} autoPlay playsInline></video>
      <video ref={myVideoRef} muted autoPlay playsInline />
    </div>
  );
};

export default VideoChat;
