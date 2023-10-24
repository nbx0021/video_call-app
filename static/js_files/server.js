// server.js

// Socket.IO connection setup
const socket = io.connect('http://127.0.0.1:5000');

// Join a room
socket.emit('join_room', { room_id: roomID, user_email: userEmail });

// Handle room joined event
socket.on('room_joined', (data) => {
  // Display a message or perform actions when a user joins the room
  console.log(data.message); 
});

// Handle offer event from the other user
socket.on('offer', (data) => {
  
  const offer = new RTCSessionDescription(data.offer);

  peerConnection.setRemoteDescription(offer)
    .then(() => {
      return peerConnection.createAnswer();
    })
    .then((answer) => {
      return peerConnection.setLocalDescription(answer);
    })
    .then(() => {
      socket.emit('answer', {
        answer: peerConnection.localDescription,
        room_id: roomID,
      });
    })
    .catch((error) => console.error('Error handling offer:', error));
});

// Handle answer event from the other user
socket.on('answer', (data) => {
  
  const answer = new RTCSessionDescription(data.answer);

  peerConnection.setRemoteDescription(answer)
    .catch((error) => console.error('Error handling answer:', error));
});

// Handle ICE candidate event from the other user
socket.on('ice_candidate', (data) => {
  // Implement logic to handle ICE candidate information
  const candidate = new RTCIceCandidate(data.candidate);

  peerConnection.addIceCandidate(candidate)
    .catch((error) => console.error('Error handling ICE candidate:', error));
});
