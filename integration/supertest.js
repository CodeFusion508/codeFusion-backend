const supertest = require("supertest");
const { config } = require("dotenv");
config();

const path = `http://localhost:${process.env.PORT || 3000}`;

module.exports = () => supertest(path);