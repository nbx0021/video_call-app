// webrtc.js

// Initialize WebRTC connection
const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
const peerConnection = new RTCPeerConnection(configuration);

// Get user media (camera and microphone)
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    const localVideo = document.getElementById('local-video');
    localVideo.srcObject = stream;
    peerConnection.addStream(stream);
  })
  .catch((error) => console.error('getUserMedia error:', error));

// Handle incoming stream from other user
peerConnection.onaddstream = (event) => {
  const remoteVideo = document.getElementById('remote-video');
  remoteVideo.srcObject = event.stream;
};

// Handle ICE candidate events
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    socket.emit('ice_candidate', {
      candidate: event.candidate,
      room_id: roomID,
    });
  }
};

// Handle Start Video button click
document.getElementById('start-call').addEventListener('click', () => {

  startVideoCall();
});


// Handle Mute Audio button click
document.getElementById('mute-audio').addEventListener('click', () => {
  toggleAudioMute();

});

// Handle End Call button click
document.getElementById('end-call').addEventListener('click', () => {
  // Implement the logic to end the call and close the connection
  // Function to end the call and close the connection
  endCall();

});
