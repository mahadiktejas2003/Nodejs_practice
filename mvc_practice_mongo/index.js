const express = require("express");
const fs = require("fs");
const {connectMongoDb} = require("./connection");

const userRouter = require("./routes/user");
const {logReqRes}= require("./middlewares");
const { log } = require("console");
const app = express();
const PORT = 3000;

// Connection
connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1').then(()=>{
    console.log('MongoDB connected')
})

// Middleware – Plugin
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
