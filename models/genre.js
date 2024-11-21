const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, unique: true },  // The genre name
  // Reference to associated book instances
  bookInstances: [{ type: Schema.Types.ObjectId, ref: "BookInstance" }],
});

// Virtual for genre's URL
GenreSchema.virtual("url").get(function () {
  return `/catalog/genre/${this._id}`;
});

// Export model
module.exports = mongoose.model("Genre", GenreSchema);
