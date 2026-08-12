const neo4j = require("neo4j-driver");

const URI = process.env.COGNODB_URI;
const USERNAME = process.env.COGNODB_USERNAME;
const PASSWORD = process.env.COGNODB_PASSWORD;

const driver = neo4j.driver(
  URI,
  neo4j.auth.basic(USERNAME, PASSWORD)
);

async function verifyDatabaseConnection() {
  try {
    await driver.verifyConnectivity();
    console.log("CognoDB connection established");
  } catch (error) {
    console.error("CognoDB connection failed:", error.message);
    throw error;
  }
}

module.exports = {
  driver,
  verifyDatabaseConnection
};