const { config } = require("dotenv");
config();

const supertest = require("supertest");
const path = `http://localhost:${process.env.PORT}`;

module.exports = supertest(path);