const express = require("express"),
    apiRouter = require("./routes"),
    path = require("path"),
    app = express();

app.use(express.json());
app.use("/api", apiRouter);
app.use("/", express.static(path.join(__dirname, "../client")));

app.listen(3000);