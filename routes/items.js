const express = require("express");
const router = express.Router({ mergeParams: true });

const item_controller = require("../controllers/itemController");

router.get('/item/:itemId', item_controller.item_details)

module.exports = router;