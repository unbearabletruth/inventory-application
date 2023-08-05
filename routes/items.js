const express = require("express");
const router = express.Router({ mergeParams: true });
const multer  = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) 
    }
  })

const upload = multer({ storage: storage }); 
  
const item_controller = require("../controllers/itemController");

router.get('/item/create', item_controller.item_create_get);

router.post('/item/create', upload.single('image'), item_controller.item_create_post);

router.get("/item/:itemId/delete", item_controller.item_delete_get);

router.post("/item/:itemId/delete", item_controller.item_delete_post);

router.get("/item/:itemId/update", item_controller.item_update_get);

router.post("/item/:itemId/update", item_controller.item_update_post);

router.get('/item/:itemId', item_controller.item_details)

module.exports = router;