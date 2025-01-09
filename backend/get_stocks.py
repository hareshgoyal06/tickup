from fastapi import FastAPI, HTTPException
import yfinance as yf
from newsapi import NewsApiClient
from get_sentiment import get_sentiment_for_stock

NEWS_API_KEY = "6f365a942f3f43eeba973bc863d41c95"


app = FastAPI()

@app.get("/stock/{symbol}")
async def get_stock_price(symbol: str):
    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period="1d")

        if data.empty:
            raise HTTPException(status_code=404, detail="Stock symbol not found")

        return {
            "symbol": symbol.upper(),
            "current_price": data["Close"].iloc[-1],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stock/{symbol}/historical")
async def get_historical_data(symbol: str, period: str = "1y"):
    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period=period)

        if data.empty:
            raise HTTPException(status_code=404, detail="Stock symbol not found")

        historical_data = data.reset_index().to_dict(orient="records")
        return {"symbol": symbol.upper(), "historical_data": historical_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Route to get stock info
@app.get("/stock/{symbol}/info")
async def get_stock_info(symbol: str):
    try:
        stock = yf.Ticker(symbol)
        info = stock.info

        if not info:
            raise HTTPException(status_code=404, detail="Stock symbol not found")

        return {
            "symbol": info.get("symbol", "N/A"),
            "name": info.get("shortName", "N/A"),
            "sector": info.get("sector", "N/A"),
            "industry": info.get("industry", "N/A"),
            "website": info.get("website", "N/A"),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Route to get today's opening price
@app.get("/stock/{symbol}/opening")
async def get_opening_price(symbol: str):
    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period="1d")

        if data.empty:
            raise HTTPException(status_code=404, detail="Stock symbol not found")

        opening_price = data["Open"].iloc[-1]

        return {
            "symbol": symbol.upper(),
            "opening_price": opening_price,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


#all news stuff
newsapi = NewsApiClient(api_key=NEWS_API_KEY)

@app.get("/stock/{symbol}/news")
async def get_stock_news(symbol: str):
    try:
        news = newsapi.get_everything(
            q=symbol,
            language="en",
            sort_by="relevancy",
            page_size=5
        )

        if not news["articles"]:
            raise HTTPException(status_code=404, detail="No news articles found.")

        # Return relevant news data
        return {
            "symbol": symbol.upper(),
            "articles": [
                {
                    "title": article["title"],
                    "description": article["description"],
                    "url": article["url"],
                    "image": article["urlToImage"],
                    "source": article["source"]["name"],
                }
                for article in news["articles"]
            ],
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.get("/stock/{symbol}/sentiment")
async def get_stock_sentiment(symbol: str):
    try:
        sentiment_data = get_sentiment_for_stock(symbol)
        return sentiment_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# from fastapi import FastAPI, HTTPException
# from newsapi import NewsApiClient
# import requests
# from transformers import pipeline
# import os

# # Initialize FastAPI
# app = FastAPI()

# # Load environment variables
# NEWS_API_KEY = "6f365a942f3f43eeba973bc863d41c95"
# if not NEWS_API_KEY:
#     raise Exception("Please set the NEWS_API_KEY environment variable.")

# # Initialize NewsAPI client
# newsapi = NewsApiClient(api_key=NEWS_API_KEY)

# # Initialize Hugging Face sentiment analysis pipeline
# sentiment_pipeline = pipeline("sentiment-analysis")

# # ✅ Route to fetch news and analyze sentiment for a stock symbol
# @app.get("/stock/{symbol}/sentiment")
# async def get_stock_sentiment(symbol: str):
#     try:
#         # Fetch news articles related to the stock symbol
#         news = newsapi.get_everything(q=symbol, language="en", sort_by="relevancy", page_size=5)

#         if not news["articles"]:
#             raise HTTPException(status_code=404, detail="No news articles found.")

#         # Collect article descriptions for sentiment analysis
#         article_descriptions = [article["description"] for article in news["articles"] if article["description"]]

#         # Perform sentiment analysis on the articles
#         sentiments = sentiment_pipeline(article_descriptions)

#         # Calculate average sentiment score
#         positive_count = sum(1 for sentiment in sentiments if sentiment["label"] == "POSITIVE")
#         negative_count = sum(1 for sentiment in sentiments if sentiment["label"] == "NEGATIVE")

#         overall_sentiment = "Positive" if positive_count >= negative_count else "Negative"

#         # Return sentiment analysis result
#         return {
#             "symbol": symbol.upper(),
#             "sentiment": overall_sentiment,
#             "positive_articles": positive_count,
#             "negative_articles": negative_count,
#             "articles": news["articles"],
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
