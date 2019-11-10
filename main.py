import json
from flask import Flask, render_template, request
import nlp

app = Flask(__name__)


@app.route('/')
def root():
	return render_template('index.html')

@app.route('/_transcript', methods=['POST'])
def handleTS():
	if request.method == 'POST':
		data = json.dumps(request.json["ts"])
		print(data)

		sent_score, sent_mag = nlp.get_sent(json.dumps(request.json["ts"]))
		return str(sent_score)

	return "500"


# For development server only
if __name__ == '__main__':
	app.run()
