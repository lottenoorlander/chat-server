const express = require("express");
const messageRouterFactory = require("./message/router");
const bodyParser = require("body-parser");
const Sse = require("json-sse");
const Message = require("./message/model");
const bodyParserMiddleWare = bodyParser.json();
const stream = new Sse();
const messageRouter = messageRouterFactory(stream);

const app = express();

const port = 4000;

app.use(bodyParserMiddleWare);

app.use(messageRouter);
app.get("/", (req, res) => {
  stream.send("hi");
  res.send("hello");
});

app.get("/stream", async (req, res, next) => {
  try {
    const messages = await Message.findAll(); //array of messages
    const string = JSON.stringify(messages); //you need to turn it into json first
    stream.updateInit(string); //gets data ready to send when connect
    stream.init(req, res);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
