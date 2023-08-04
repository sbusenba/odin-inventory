const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemschema = new Schema({
  name: { type: String },
  description: { type: String },
});

itemschema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

module.exports = mongoose.model("Category", itemschema);
