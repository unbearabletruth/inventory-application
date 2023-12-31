const express = require("express");
const router = express.Router();
const itemRouter = require('./items')

const category_controller = require("../controllers/categoryController");


router.get("/", category_controller.index);

router.get("/category/create", category_controller.category_create_get);

router.post("/category/create", category_controller.category_create_post);

router.get("/category/:id/delete", category_controller.category_delete_get);

router.post("/category/:id/delete", category_controller.category_delete_post);

router.get("/category/:id/update", category_controller.category_update_get);

router.post("/category/:id/update", category_controller.category_update_post);

router.get('/category/:id', category_controller.items_list)

router.use('/category/:id', itemRouter)

module.exports = router;