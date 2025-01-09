import praw
from transformers import pipeline
import os

# Initialize Hugging Face sentiment analysis pipeline
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

# Initialize Reddit API client
reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    username=os.getenv("REDDIT_USERNAME"),
    password=os.getenv("REDDIT_PASSWORD"),
    user_agent="stock-sentiment-analysis-app"
)

# Function to get Reddit sentiment for a stock symbol
def get_reddit_sentiment_for_stock(symbol: str):
    # Search for posts mentioning the stock symbol
    query = f"{symbol} stock OR {symbol} share price OR {symbol} market"
    subreddit = reddit.subreddit("all")
    posts = subreddit.search(query, sort="relevance", limit=10)

    # Extract post titles and selftext for sentiment analysis
    texts = [post.title + " " + post.selftext for post in posts]

    if not texts:
        return {"symbol": symbol, "sentiment": "No posts found", "positive_posts": 0, "negative_posts": 0}

    # Perform sentiment analysis
    sentiments = sentiment_pipeline(texts)

    # Calculate sentiment counts
    positive_count = sum(1 for sentiment in sentiments if sentiment["label"] == "POSITIVE")
    negative_count = sum(1 for sentiment in sentiments if sentiment["label"] == "NEGATIVE")
    overall_sentiment = "Positive" if positive_count >= negative_count else "Negative"

    # Return sentiment summary
    return {
        "symbol": symbol.upper(),
        "sentiment": overall_sentiment,
        "positive_posts": positive_count,
        "negative_posts": negative_count,
        "posts": [
            {
                "title": post.title,
                "url": post.url,
                "score": post.score,
                "sentiment": sentiments[i]["label"],
            }
            for i, post in enumerate(posts)
        ],
    }

# Example usage
if __name__ == "__main__":
    print(get_reddit_sentiment_for_stock("AAPL"))
