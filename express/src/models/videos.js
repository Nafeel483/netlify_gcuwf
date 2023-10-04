const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  url: { type: String, unique: true, required: true },
  thumbnail: { type: String, required: false },
  title: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  recieverEmail: { type: String, required: false }
});
module.exports = mongoose.model("Video", videoSchema);
