const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

/*
Message needs the have following fields:
1. Title
2. Message
3. Time stamp
4. Author(just store the reference to the user)
*/

const MessageSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  time_stamp: { type: Date, default: Date.now() },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

MessageSchema.virtual("url").get(function () {
  return `/message/${this._id}`;
});

MessageSchema.virtual("created").get(function () {
  return this.time_stamp.toLocaleString(DateTime.DATETIME_MED);
})

module.exports = mongoose.model("Message", MessageSchema);