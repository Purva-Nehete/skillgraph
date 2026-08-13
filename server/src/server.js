require("dotenv").config();

const express = require("express");
const cors = require("cors");

const roleRoutes = require("./routes/roleRoutes");
const {
  verifyDatabaseConnection
} = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/roles", roleRoutes);

async function startServer() {
  try {
    await verifyDatabaseConnection();

    app.listen(PORT, () => {
      console.log(`SkillGraph API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start SkillGraph API:", error.message);
    process.exit(1);
  }
}

startServer();