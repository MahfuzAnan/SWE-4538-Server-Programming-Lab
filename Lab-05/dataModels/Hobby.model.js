const mongoose = require("mongoose");

const HobbySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    default:'',
  },
  images: {
    type: [String],
    default:[],
  },
  userID: {
    type: String,
    required: true,
  },
  audio: {
    type: String,
    default:'',
  },
});

module.exports = mongoose.model("Hobby", HobbySchema);
