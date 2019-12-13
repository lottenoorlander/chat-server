const express = require("express");
const { Router } = express;
const Message = require("./model");

function factory(stream) {
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
      const action = {
        type: "NEW_MESSAGE",
        payload: message
      };

      const string = JSON.stringify(action);

      stream.send(string);

      res.send(message);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = factory;
