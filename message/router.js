const express = require("express");
const { Router } = express;
const Message = require("./model");

const router = new Router();

router.get("/message", (req, res, next) => {
  Message.findAll()
    .then(messages => res.send(messages))
    .catch(error => next(error));
});

router.post("/message", (req, res, next) => {
  Message.create(req.body)
    .then(message => res.send(message))
    .catch(error => next(error));
});

module.exports = router;
