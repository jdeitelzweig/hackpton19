import os

# Imports the Google Cloud client library
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

# Set environment variable to API Key
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "google-cloud-key.json"

# Instantiates a client
client = language.LanguageServiceClient()


def get_tokens(text):
	document = types.Document(
    	content=text,
    	type=enums.Document.Type.PLAIN_TEXT)

	tokens = client.analyze_syntax(document=document).tokens
	return tokens


def get_sent(text):
	document = types.Document(
    	content=text,
    	type=enums.Document.Type.PLAIN_TEXT)

	# Detects the sentiment of the text
	sentiment = client.analyze_sentiment(document=document).document_sentiment
	return sentiment.score, sentiment.magnitude


def get_categories(text):
	# Don't give an error if there isn't enough tokens
	if len(get_tokens(text)) <= 20:
		return []

	document = types.Document(
    	content=text,
    	type=enums.Document.Type.PLAIN_TEXT)

	categories = client.classify_text(document=document).categories
	# each has name and confidence fields
	return categories


def entity_sent(text):
	document = types.Document(
    	content=text,
    	type=enums.Document.Type.PLAIN_TEXT)

	ent_sent = client.analyze_entity_sentiment(document=document).entities
	# each has name, sentiment, mentions fields
	ents = {}
	for ent in ent_sent:
		ents[ent.name] = {
			"name": ent.name,
			"type": enums.Entity.Type(ent.type).name,
			"salience": ent.salience,
			"sent_score": ent.sentiment.score,
			"sent_mag": ent.sentiment.magnitude
			}
		
	return sorted(list(ents.values()), key=lambda x:x["salience"])


if __name__ == "__main__":
	print(get_sent("hello world!"))
