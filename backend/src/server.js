
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const journalRoutes = require("./routes/journalRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "PKL API is running!"
  });
});

app.use("/api/journals", journalRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
