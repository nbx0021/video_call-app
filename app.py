import json
from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, emit, join_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hello_world'
socketio = SocketIO(app)

# Store room information in a dictionary
rooms = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_call/<email>/<room_id>')
def video_call(email, room_id):
    return render_template('video_call.html', userEmail=email, roomID=room_id)

@socketio.on('connect')
def handle_connect():
    print('User connected')

@socketio.on('join_room')
def handle_join_room(data):
    room_id = data['room_id']
    user_email = data['user_email']
    if room_id not in rooms:
        rooms[room_id] = [request.sid]
    else:
        rooms[room_id].append(request.sid)
    join_room(room_id)
    emit('room_joined', {'message': 'You have joined the room.'}, room=request.sid)

@socketio.on('offer')
def handle_offer(data):
    room_id = data['room_id']
    emit('offer', data, room=room_id, skip_sid=request.sid)

@socketio.on('answer')
def handle_answer(data):
    room_id = data['room_id']
    emit('answer', data, room=room_id, skip_sid=request.sid)

@socketio.on('ice_candidate')
def handle_ice_candidate(data):
    room_id = data['room_id']
    emit('ice_candidate', data, room=room_id, skip_sid=request.sid)

if __name__ == '__main__':
    socketio.run(app, debug=True)
