const express = require("express");
const messageRouter = require("./message/router");
const bodyParser = require("body-parser");
const Sse = require("json-sse");
const stream = new Sse();
const bodyParserMiddleWare = bodyParser.json();
const app = express();

const port = 4000;

app.use(bodyParserMiddleWare);

app.use(messageRouter);
app.get("/", (req, res) => {
  stream.send("hi");
  res.send("hello");
});
app.get("/stream", (req, res, next) => {
  stream.init(req, res);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
