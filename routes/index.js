const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect("/categories");
});

module.exports = router;
