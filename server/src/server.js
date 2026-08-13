require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
  verifyDatabaseConnection
} = require("./config/database");