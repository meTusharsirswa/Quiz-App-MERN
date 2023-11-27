
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: { type: String, default: null },
 
  token: { type: String },
});

module.exports = mongoose.model('User', userSchema)
