const express = require("express");
const router = express.Router({ mergeParams: true });

const item_controller = require("../controllers/itemController");

router.get('/item/create', item_controller.item_create_get);

router.post('/item/create', item_controller.item_create_post);

router.get("/item/:itemId/delete", item_controller.item_delete_get);

router.post("/item/:itemId/delete", item_controller.item_delete_post);

//router.get("/item/:itemId/update", item_controller.item_update_get);

//router.post("/item/:itemId/update", item_controller.item_update_post);

router.get('/item/:itemId', item_controller.item_details)

module.exports = router;