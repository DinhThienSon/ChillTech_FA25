// Load env (CommonJS)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

// Import nội bộ (CommonJS)
const { connectDB } = require("./config/configDB");
const { viewEngine } = require("./config/viewEngine");
const { initWebRoutes } = require("./routes/web");
const { initAPIRoutes } = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 9999;

// Connect DB
connectDB();

// CORS
app.use(
  cors({
    origin: process.env.REACT_URL,
    credentials: true,
  })
);

// Middlewares
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes & view
viewEngine(app);
initWebRoutes(app);
initAPIRoutes(app);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});