## Inspiration
75% of the population #1 social anxiety is the fear of public speaking. Proper speech coaching ameliorates this issue but is a luxury to many. Cicero bridges this gap, as a speech coach open to all.

## What it does
Cicero gives real-time analysis of speaking patterns to the client, allowing them to actively improve their presentation as they continue.

## How we built it
Cicero calls on Google Clouds NLP and Speech to Text API's through a Flask server (server is hosted on Google App Engine). It handles most of the data-processing on the client side using javascript to avoid large latency delays. We connected the frontend to the backend through AJAX requests. Finally, we built the frontend with HTML, CSS, and various JavaScript libraries. 

## What we learned
Backend - So much about Google Cloud, and how to effectively use Flask
Frontend - Lots of AJAX and other useful javascript libraries, WebDev.

## What's next for Cicero
We plan to do a lot more work with it. We already are working on a new interactive landing page on the way and we want to work a lot on improving the response time and accuracy of the clarity, WPM, and sentiment metrics. Also, we plan on adding more natural language features such as entity specific sentiment analysis and content classification. 
Our long term goals are to have a effective, open-to-all, platform that can analyze both speech and body/facial expression to give users true information on their performance!

Please let us know if you have any feedback!
