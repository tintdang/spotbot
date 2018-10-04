const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: String,
    index: true,
    unique: true
  },
  name: String,
  attributes: {
    type: Object,
    default: {},
  },
  inGame: {
    type: Boolean,
    default: false
  },
  correctGuesses: {
    type: Number,
    default: 0
  },
  fakeOuts: {
    type: Number,
    default: 0
  },
})

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;