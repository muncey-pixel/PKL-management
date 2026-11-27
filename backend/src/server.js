const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const journalRoutes = require("./routes/journalRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
}));

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Gagal konek database:", error.message);
    res.status(500).json({ success: false, message: "Database tidak terhubung" });
  }
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "PKL API is running!"
  });
});

app.use("/api/journals", journalRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;