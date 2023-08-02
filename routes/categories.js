const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

/// Category ROUTES ///

// GET catalog home page.
router.get("/", category_controller.index);

router.get('/category/:id', category_controller.items_list)


module.exports = router;