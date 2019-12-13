const express = require("express");
const messageRouter = require("./message/router");

const app = express();

const port = 4000;

app.use(messageRouter);
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
