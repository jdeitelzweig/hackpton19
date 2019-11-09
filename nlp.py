import os

# Imports the Google Cloud client library
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

# Set environment variable to API Key
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "google-cloud-key.json"

# Instantiates a client
client = language.LanguageServiceClient()

def get_sent(text):
	document = types.Document(
    	content=text,
    	type=enums.Document.Type.PLAIN_TEXT)

	# Detects the sentiment of the text
	sentiment = client.analyze_sentiment(document=document).document_sentiment

	return sentiment.score, sentiment.magnitude

if __name__ == "__main__":
	print(get_sent("hello world!"))
