const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("../config/passport");
const fs = require('fs');

const userFilePath = path.join(__dirname, '..', 'data', 'user.json')
let users = []; // store the user info here
fs.readFile(userFilePath, "utf-8", (err, data)=>{
  if(err){
    console.log(err)
    return
  }
  users = JSON.parse(data)

  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    );
})

const getLogin = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "login.html");
  res.sendFile(filePath);
};

const postLogin = (req, res, next) => {

  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};


const getRegister = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "register.html");
  res.sendFile(filePath);
};

const postRegister = async (req, res, next) => {

  const minLength = 8;
  const minUppercase = 1;
  const minLowercase = 1;
  const minDigits = 1;

  const pass = req.body.password

  if(pass === null){
    console.log("No password")
    return
  }

  if(pass.length < minLength || pass.match(/[A-Z]/g).length < minUppercase || pass.match(/[a-z]/g).length < minLowercase || pass.match(/\d/g).length < minDigits){
    console.log("Weak password!")
    return
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // req.body.password ==> password should be exact match to register.html name=password,  10:how many time you want to generate hash. it's a standard default value
    users.push({
      id: Date.now().toString(),
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const filePath = path.join(__dirname, '..', 'data', 'user.json')
    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err)=>{
      if(err){
        console.log(err)
      }
    })

    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
  console.log(users); // show the user list
};
module.exports = {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
};
