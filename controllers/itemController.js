const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.item_details = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.itemId).exec()
    if (item === null) {
      const err = new Error("Item not found");
      err.status = 404;
      return next(err);
    }
    res.render("item_details", {
      item: item
    });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().exec()
  res.render("item_form", { 
    title: "Create item",
    categories: categories,
    current_category: req.params.id
  });
});

exports.item_create_post = [
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Category description must contain at least 8 characters")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body("category", "Choose category.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Item must have a price.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("number_in_stock", "Item must have a price.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock
    });

    if (!errors.isEmpty()) {
      const categories = await Category.find().exec()
      res.render("item_form", {
        title: "Create item",
        categories: categories,
        item: item,
        errors: errors.array(),
      });
      return;
    } else {
      const itemExists = await Item.findOne({ name: req.body.name }).exec();
      if (itemExists) {
        res.redirect(itemExists.url);
      } else {
        await item.save();
        res.redirect(item.url);
      }
    }
  }),
];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.itemId).exec();
  if (item === null) {
    res.redirect(`/category/${req.params.id}`);
  }
  res.render("item_delete", {
    item: item
  });
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndRemove(req.params.itemId);
  res.redirect(`/category/${req.params.id}`);
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [item, categories] = await Promise.all([
    Item.findById(req.params.itemId).exec(),
    Category.find().exec()
  ]) 
  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }
  res.render("item_form", { 
    title: "Update item",
    categories: categories,
    item: item
  });
});

exports.item_update_post = [
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Category description must contain at least 8 characters")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body("category", "Choose category.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Item must have a price.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("number_in_stock", "Item must have a price.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      _id: req.params.itemId
    });

    if (!errors.isEmpty()) {
      const categories = await Category.find().exec()
      res.render("item_form", {
        title: "Create item",
        categories: categories,
        item: item,
        errors: errors.array(),
      });
      return;
    } else {
      await Item.findByIdAndUpdate(req.params.itemId, item, {});
      res.redirect(item.url);
    }
  }),
];