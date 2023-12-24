const express = require("express");
const morgan = require("morgan");
const bookRouter = require("./routes/bookRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/books", bookRouter);

module.exports = app;
