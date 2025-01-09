from newsapi import NewsApiClient
from transformers import pipeline
import os

# Load environment variables
NEWS_API_KEY = "6f365a942f3f43eeba973bc863d41c95"

# Initialize NewsAPI client and Hugging Face pipeline
newsapi = NewsApiClient(api_key=NEWS_API_KEY)
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

# Function to get sentiment analysis for a stock symbol
def get_sentiment_for_stock(symbol: str):
    keywords = f"{symbol} stock OR {symbol} share price OR {symbol} market"
    news = newsapi.get_everything(q=keywords, language="en", sort_by="relevancy", page_size=5)

    # Check if there are articles
    if not news["articles"]:
        return {"symbol": symbol, "sentiment": "No articles found", "positive_articles": 0, "negative_articles": 0}

    # Perform sentiment analysis on article descriptions
    article_descriptions = [article["description"] for article in news["articles"] if article["description"]]
    sentiments = sentiment_pipeline(article_descriptions)

    # Calculate sentiment
    positive_count = sum(1 for sentiment in sentiments if sentiment["label"] == "POSITIVE")
    negative_count = sum(1 for sentiment in sentiments if sentiment["label"] == "NEGATIVE")
    overall_sentiment = "Positive" if positive_count >= negative_count else "Negative"

    # Return sentiment data
    return {
        "symbol": symbol.upper(),
        "sentiment": overall_sentiment,
        "positive_articles": positive_count,
        "negative_articles": negative_count,
        "articles": news["articles"],
    }
