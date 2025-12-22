require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;



// NSE headers
const headers = {
  "User-Agent": "Mozilla/5.0",
  Accept: "application/json",
  Referer: "https://www.nseindia.com",
};

/* =========================
   STOCK DETAILS API
========================= */
app.get("/api/stock/:symbol", async (req, res) => {
  try {
    const rawSymbol = req.params.symbol.toUpperCase();
    const symbol = rawSymbol.replace(".NSE", "");

    // Get cookies
    const cookieRes = await axios.get("https://www.nseindia.com", { headers });
    const cookies = cookieRes.headers["set-cookie"].join("; ");

    // Fetch stock quote
    const quoteRes = await axios.get(
      `https://www.nseindia.com/api/quote-equity?symbol=${symbol}`,
      {
        headers: { ...headers, Cookie: cookies },
      }
    );

    const priceInfo = quoteRes.data.priceInfo;
    const lastPrice = priceInfo.lastPrice;

    if (!lastPrice) {
      return res.status(404).json({ error: "No price data" });
    }

    const labels = ["Open", "Low", "High", "Previous Close", "Last Price"];
    const prices = [
      priceInfo.open,
      priceInfo.intraDayHighLow.min,
      priceInfo.intraDayHighLow.max,
      priceInfo.previousClose,
      lastPrice,
    ];

    res.json({
      symbol: `${symbol}.NSE`,
      labels,
      prices,
    });

  } catch (err) {
    console.error("Stock API error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* =========================
   TOP GAINERS & LOSERS API
========================= */
app.get("/api/top-movers", async (req, res) => {
  try {
    // Step 1: Get NSE cookies
    const cookieRes = await axios.get("https://www.nseindia.com", { headers });
    const cookies = cookieRes.headers["set-cookie"].join("; ");

    // Step 2: Fetch top movers
    const url =
      "https://www.nseindia.com/api/live-analysis-variations?index=NIFTY%2050";

    const response = await axios.get(url, {
      headers: { ...headers, Cookie: cookies },
    });

    const rawData = response.data?.data;

    // 🛑 SAFETY CHECK
    if (!rawData || !rawData.Gainers || !rawData.Losers) {
      throw new Error("Unexpected NSE response structure");
    }

    // ✅ Extract correctly
    const gainers = rawData.Gainers.slice(0, 5).map(stock => ({
      symbol: stock.symbol,
      price: stock.lastPrice,
      change: stock.change,
      percent: stock.pChange,
    }));

    const losers = rawData.Losers.slice(0, 5).map(stock => ({
      symbol: stock.symbol,
      price: stock.lastPrice,
      change: stock.change,
      percent: stock.pChange,
    }));

    res.json({ gainers, losers });

  } catch (err) {
    console.error("Top movers error:", err.message);

    // 🔁 Fallback (never break frontend)
    res.json({
      gainers: [
        { symbol: "RELIANCE", price: 2810, change: 45, percent: 1.62 },
        { symbol: "INFY", price: 1625, change: 28, percent: 1.75 },
      ],
      losers: [
        { symbol: "HDFCBANK", price: 1450, change: -22, percent: -1.49 },
        { symbol: "TCS", price: 3890, change: -35, percent: -0.89 },
      ],
    });
  }
});
const xml2js = require("xml2js");

// =====================
// INDIAN MARKET NEWS API
// =====================
app.get("/api/market-news", async (req, res) => {
  try {
    const rssUrl = "https://www.moneycontrol.com/rss/marketreports.xml";

    const response = await axios.get(rssUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);

    const items = result.rss.channel[0].item;

    const news = items.slice(0, 10).map(item => item.title[0]);

    res.json({ news });

  } catch (err) {
    console.error("Market news error:", err.message);

    // fallback (never breaks UI)
    res.json({
      news: [
        "Sensex trades higher amid global cues",
        "Nifty IT stocks see buying interest",
        "RBI policy decision awaited by markets"
      ]
    });
  }
});
// =====================
// NSE MARKET STATS
// =====================
app.get("/api/market-stats", async (req, res) => {
  try {
    // Step 1: Get NSE cookies
    const cookieRes = await axios.get("https://www.nseindia.com", { headers });
    const cookies = cookieRes.headers["set-cookie"].join("; ");

    // Step 2: Fetch market breadth
    const url = "https://www.nseindia.com/api/marketStatus";
    const response = await axios.get(url, {
      headers: {
        ...headers,
        Cookie: cookies
      }
    });

    const breadth = response.data.marketBreadth?.[0];

    res.json({
      advances: breadth.advance,
      declines: breadth.decline,
      unchanged: breadth.unchanged,
      timestamp: new Date().toLocaleTimeString()
    });

  } catch (err) {
    console.error("Market stats error:", err.message);

    // fallback
    res.json({
      advances: 1123,
      declines: 842,
      unchanged: 98,
      timestamp: "Fallback"
    });
  }
});
app.post("/api/ai-chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message required" });
    }

    // 🔑 1. Get IBM Token
    const tokenRes = await axios.post(
      "https://iam.cloud.ibm.com/identity/token",
      `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${process.env.WATSON_API_KEY}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    // 🔹 2. Send message to Watsonx
    const aiRes = await axios.post(
      process.env.WATSON_URL,
      {
        messages: [
          { role: "system", content: "You are a finance expert assistant." },
          { role: "user", content: userMessage },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply =
      aiRes.data?.choices?.[0]?.message?.content ||
      "No response from AI.";

    res.json({ reply });

  } catch (err) {
    console.error("AI ERROR:", err.message);
    res.status(500).json({ reply: "AI service unavailable" });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

