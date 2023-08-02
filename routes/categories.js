const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");

/// Category ROUTES ///

// GET catalog home page.
router.get("/", category_controller.index);

router.get('/category/:id', category_controller.items_list)


module.exports = router;