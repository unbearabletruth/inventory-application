const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true},
  number_in_stock: { type: Number, required: true},
  imageUrl: { type: String }
});

ItemSchema.virtual("url").get(function () {
  return `/category/${this.category}/item/${this._id}`;//bad idea to place field that can be populated into url, should find a way to use category._id instead
});

module.exports = mongoose.model("Item", ItemSchema);