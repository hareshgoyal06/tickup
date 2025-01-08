from fastapi import FastAPI, HTTPException
import yfinance as yf

app = FastAPI()

@app.get("/stock/{symbol}")
async def get_stock_price(symbol: str):
    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period="1d")

        if data.empty:
            raise HTTPException(status_code=404, detail="Stock symbol not found")

        # Return the most recent stock price
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

@app.get("/stock/{symbol}/opening")
async def get_opening_price(symbol: str):
    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period="1d")

        if data.empty:
            raise HTTPException(status_code=404, detail="Stock symbol not found")

        # Extract today's opening price
        opening_price = data["Open"].iloc[-1]

        return {
            "symbol": symbol.upper(),
            "opening_price": opening_price,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))