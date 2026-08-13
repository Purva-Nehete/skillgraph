const neo4j = require("neo4j-driver");

const URI = process.env.COGNODB_URI;
const USERNAME = process.env.COGNODB_USERNAME;
const PASSWORD = process.env.COGNODB_PASSWORD;

if (!URI || !USERNAME || !PASSWORD) {
  throw new Error(
    "Missing CognoDB environment variables. Check your .env file."
  );
}

const driver = neo4j.driver(
  URI,
  neo4j.auth.basic(USERNAME, PASSWORD)
);

async function verifyDatabaseConnection() {
  try {
    await driver.verifyConnectivity();

    console.log("CognoDB connection established successfully.");
  } catch (error) {
    console.error("CognoDB connection failed.");
    console.error(error.message);

    throw error;
  }
}

module.exports = {
  driver,
  verifyDatabaseConnection
};