import json

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)


@app.route('/')
def root():
	return render_template('index.html')

@app.route('/_transcript', methods = ['POST'])
def handleTS():
	if request.method == 'POST':
		print("RECEIVED POST REQUEST")
		print("PRINTED: " + json.dumps(request.json))
		#data = request.json
		#print("JSON: " + json.dumps(data));
	
	return "done"

# For development server only
if __name__ == '__main__':
	app.run(host='127.0.0.1', port=8080, debug=True)