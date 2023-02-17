/* eslint-disable no-console */
// disabled for development.
import express from "express";
import helmet from "helmet";
// import mongoose from "mongoose";

let app = express();
const PORT = 3000;

app.use(helmet());

app.get("/", (req, res) => {
    res.send("Testing a ec2 instance");
});

app.get("/api", (req, res) => {
    res.send("this is another endpoint");
});

app.listen(PORT, () => {
    console.log(`Running at PORT: ${PORT}`);
});

/*
    Alfredo3232 - 2/2/2023
    at least for right now I am thinking of using the MongoDB online service, since it will be more cost effective using different services
    to handle the work.
*/

//  mongoose
//     .connect("", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
//     .then(() => {
//         app.listen(PORT || 5000);
//         console.log("Connected MongoDB");
//     })
//     .catch(err => {
//         console.log(err);
//     });