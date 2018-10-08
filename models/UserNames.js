const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserNameSchema = new Schema({
  username: String,
  unique: true
})

// This creates our model from the above schema, using mongoose's model method
const UserName = mongoose.model("UserName", UserNameSchema);

// Export the User model
module.exports = UserName;