const Hobby = require("../dataModels/Hobby.model");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");

const postHobby = async (req, res) => {
    const { name, description, userID } = req.body;
    const errors = [];
  
    if (!name || !description || !userID) {
      errors.push("All fields are required!");
      return res.status(400).json({ error: errors });
    }
  
    const newHobby = new Hobby({
      name,
      description,
      userID,
    });
  
    newHobby
      .save()
      .then(() => {
        res.status(201).json({ message: "Hobby created successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error: "An error occurred while creating the hobby" });
      });
  };

  const getHobbiesByUserID = async (req, res) => {
    const userID = req.params.id; // Assuming the userID is in the request parameters
    try {
      const hobbies = await Hobby.find({ userID: userID });
  
      if (hobbies.length === 0) {
        return res.status(404).json({ error: "No hobbies found for this user." });
      }
  
      res.json(hobbies);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching hobbies." });
    }
  };

  const updateHobby = async (req, res) => {
    const hobbyID = req.params.id; // Assuming the hobby ID is in the request parameters
    const { name, description, userID } = req.body;
    const errors = [];
  
    if (!name || !description || !userID) {
      errors.push("All fields are required!");
      return res.status(400).json({ error: errors });
    }
  
    try {
      const hobby = await Hobby.findById(hobbyID);
  
      if (!hobby) {
        return res.status(404).json({ error: "Hobby not found." });
      }
  
      // Update the hobby properties
      hobby.name = name;
      hobby.description = description;
      hobby.userID = userID;
  
      await hobby.save();
  
      res.json({ message: "Hobby updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating the hobby." });
    }
  };
  
  const deleteHobby = async (req, res) => {
    const hobbyID = req.params.id;
    try {
      const hobby = await Hobby.findById(hobbyID);
  
      if (!hobby) {
        return res.status(404).json({ error: "Hobby not found." });
      }
  
      await hobby.deleteOne({ _id: hobbyID });
  
      res.json({ message: "Hobby deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting the hobby." });
    }
  };

  const postHobbyProfileImage = async (req, res) => {
    const hobbyID = req.params.id;
  
    try {
      const hobby = await Hobby.findById(hobbyID);
  
      if (!hobby) {
        return res.status(404).json({ error: "Hobby not found." });
      }
  
      if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
      }
  
      // Update the hobby's profile image
      hobby.profile_image = req.file.filename;
      await hobby.save();
  
      res.json({ message: "Hobby profile image updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    postHobby,
    getHobbiesByUserID,
    updateHobby,
    deleteHobby,
    postHobbyProfileImage
  };