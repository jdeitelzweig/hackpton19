
"""
    stream
    ~~~~~~
    Streaming data with Python and Flask.
    :copyright: (c) 2014 by Shipeng Feng.
    :license: BSD.
"""
import time
import random
import datetime

from flask import Flask, Response

EXPECTED_WPM_LOWER = 120
EXPECTED_WPM_UPPER = 180
app = Flask(__name__)


@app.route('/')
def index():
    def gen():
        while True:
            wpm = 85
            if (wpm < EXPECTED_WPM__LOWER):
                yield "S"
            elif (wpm > EXPECTED_WPM_UPPER):
                yield "F"
            time.sleep(0.1)
    return Response(gen())


if __name__ == '__main__':
    app.run()
