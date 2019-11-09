from flask import Flask, render_template
import nlp

app = Flask(__name__)


@app.route('/')
def root():
	return render_template('index.html')


# For development server only
if __name__ == '__main__':
	print(nlp.get_sent("Hello world!"))
	app.run(host='127.0.0.1', port=8080, debug=True)
