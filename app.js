require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const connection = require("./db/dbConfig");
const userRoute = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", userRoute);
app.use("/api/question", questionRoute);
app.use("/api/answer", answerRoute);

async function start() {
    try {
        await connection.execute("SELECT 'test'");
        app.listen(process.env.PORT);
    } catch (error) {
        console.error("Database connection error:", error.message);
    }
}

start();