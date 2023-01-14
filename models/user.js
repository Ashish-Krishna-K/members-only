const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

/*
User needs the have following fields:
1. Username
2. email(used for login)
3. password
4. confirm password(**only in signup form**)
5. isMember(**only in db**)
6. isAdmin(**only in db**)
7. joined on date
*/

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  joined_on: { type: Date, default: Date.now() },
  is_member: { type: Boolean, default: false },
  is_admin: { type: Boolean, default: false },
});

UserSchema.virtual("url").get(function () {
  return `/user/admin/${this._id}`
});

UserSchema.virtual("joined").get(function () {
  return this.joined_on.toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model("User", UserSchema);