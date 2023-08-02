const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.item_details = asyncHandler(async (req, res, next) => {
    console.log(req.params)
    const item = await Item.findById(req.params.id).exec()
    res.render("item_details", {
      item: item
    });
});