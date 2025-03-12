require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./db/dbConfig");
const userRoute = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
const bodyParser = require("body-parser");

app.use(cors({ origin: process.env.FRONTEND_URL })); // Allow frontend access
app.use(bodyParser.json());

app.use("/api/user", userRoute);
app.use("/api/question", questionRoute);
app.use("/api/answer", answerRoute);

async function start() {
    try {
        await connection.execute("SELECT 'test'");
        const PORT = process.env.PORT || 5500; // Use dynamic port
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Database connection error:", error.message);
    }
}

start();
