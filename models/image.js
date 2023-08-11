const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageschema = new Schema(
  {
    img: { data: Buffer, contentType: String },
  },
  { timestamps: true }
);

imageschema.virtual("url").get(function () {
  return `/images/${this._id}`;
});

module.exports = mongoose.model("Image", imageschema);
