from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def root():
	return render_template('index.html')

# For development server only
if __name__ == '__main__':
	app.run(host='127.0.0.1', port=8080, debug=True)