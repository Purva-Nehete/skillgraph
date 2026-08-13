require("dotenv").config();

const express = require("express");
const cors = require("cors");

const roleRoutes = require("./routes/roleRoutes");
const {
  driver,
  verifyDatabaseConnection
} = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);
app.use(express.json());
app.use("/api/roles", roleRoutes);

app.get("/api/health", async (req, res) => {
  try {
    await driver.verifyConnectivity();

    res.status(200).json({
      status: "ok",
      database: "connected",
      message: "SkillGraph API is healthy"
    });
  } catch (error) {
    console.error("Health check failed:", error.message);

    res.status(503).json({
      status: "error",
      database: "unavailable",
      message: "Database connection unavailable"
    });
  }
});

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  try {
    await verifyDatabaseConnection();
  } catch (error) {
    console.error(
      "⚠️ Database connection failed:",
      error.message
    );
  }
});