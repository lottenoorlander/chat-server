const express = require("express");
const { Router } = express;
const Message = require("./model");

const router = new Router();

router.get("/message", async (req, res, next) => {
  try {
    const messages = await Message.findAll();
    res.send(messages);
  } catch (error) {
    next(error);
  }
});

router.post("/message", async (req, res, next) => {
  try {
    const message = await Message.create(req.body);
    res.send(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
