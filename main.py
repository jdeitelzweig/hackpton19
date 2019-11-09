import json
import nlp

from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['HOST'] = '127.0.0.1'
app.config['PORT'] = 8080
app.config['DEBUG'] = True
socketio = SocketIO(app)

fullTranscript = ''

@app.route('/')
def root():
	return render_template('index.html')

@app.route('/_transcript', methods = ['POST'])
def handleTS():
	if request.method == 'POST':
		print("RECEIVED POST REQUEST")
		transcript = json.dumps(request.json["ts"])
		print("Transcript: " + json.dumps(request.json))
		global fullTranscript
		fullTranscript += transcript
		sent = nlp.get_sent(fullTranscript)[0]
		print(nlp.get_sent(transcript))
		socketio.emit('nlp_sent', {'sent': sent}, namespace="/emit")

	return "done"

@socketio.on('connect', namespace='/emit')
def test_connect():
	print("Client connected")

@socketio.on('disconnect', namespace='/emit')
def test_disconnect():
    print('Client disconnected')

# For development server only
if __name__ == '__main__':
	socketio.run(app)
