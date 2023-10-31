const express = require("express");
const router = express.Router();
const {
  postHobby,
  getHobbiesByUserID,
  updateHobby,
  deleteHobby,
  postHobbyProfileImage
} = require("../controllers/hobby.controllers");

const {uploadProfileImage, uploadAudioFile} = require("../middlewares/image.middleware")

router.post("/hobby", postHobby);
router.get("/hobby/:id", getHobbiesByUserID)
router.patch("/updatehobby/:id", updateHobby)
router.delete("/deletehobby/:id", deleteHobby)
router.post("/hobby/image/:id", uploadProfileImage.single('image'), postHobbyProfileImage);


module.exports = router;