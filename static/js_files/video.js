// video.js

// Function to start a video call
function startVideoCall() {
  // Implement the logic to start a video call

  // Create an offer
  peerConnection.createOffer()
    .then((offer) => {
      // Set the local description
      return peerConnection.setLocalDescription(offer);
    })
    .then(() => {
      // Send the offer to the other user
      socket.emit('offer', {
        offer: peerConnection.localDescription,
        room_id: roomID,
      });
    })
    .catch((error) => console.error('Error creating offer:', error));
}


// Function to mute/unmute audio

function toggleAudioMute() {
  const localStream = document.getElementById('local-video').srcObject;

  if (localStream) {
    const audioTracks = localStream.getAudioTracks();

    // Check if there are audio tracks
    if (audioTracks.length > 0) {
      // Toggle audio track state (mute/unmute)
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });

      // Update UI to reflect audio state
      const muteButton = document.getElementById('mute-audio');
      if (audioTracks[0].enabled) {
        muteButton.innerHTML = '<i class="fas fa-microphone"></i> Mute Audio';
      } else {
        muteButton.innerHTML = '<i class="fas fa-microphone-slash"></i> Unmute Audio';
      }
    }
  }
}


// Function to end the call
function endCall() {
  // Implement the logic to end the call and close the connection


  const localVideo = document.getElementById('local-video');
  const remoteVideo = document.getElementById('remote-video');

  // Stop local and remote video streams
  const localStream = localVideo.srcObject;
  const remoteStream = remoteVideo.srcObject;

  if (localStream) {
    const tracks = localStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  }

  if (remoteStream) {
    const tracks = remoteStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  }

  // Close the peer connection
  if (peerConnection) {
    peerConnection.close();
  }

  // Optionally, update UI or perform any other necessary cleanup
  // For example, hide the video elements or show a call ended message
}


// Attach click event listeners to the buttons
document.getElementById('start-call').addEventListener('click', startVideoCall);
document.getElementById('mute-audio').addEventListener('click', toggleAudioMute);
document.getElementById('end-call').addEventListener('click', endCall);
