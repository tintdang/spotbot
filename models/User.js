
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: {
    type: String,
    index: true,
  },
  name: String,
  attributes: {
    type: Object,
    default: {},
  },
})

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;