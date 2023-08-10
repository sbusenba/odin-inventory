const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemschema = new Schema({
  name: { type: String },
  description: { type: String },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  price: { type: Number },
  quantity: { type: Number },
});

itemschema.virtual("url").get(function () {
  return `/items/${this._id}`;
});

module.exports = mongoose.model("Item", itemschema);
