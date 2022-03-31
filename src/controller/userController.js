const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const auth = require("../middleware/auth");
const bcrypt = require('bcryptjs')

module.exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    const isUserExist = await User.findOne({
        email: req.body.email,
    })
      if(isUserExist){
        return res.status(400).send({
            error: "Email already exist"
        })
      }
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(400).send({
            error: "User not found"
        });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)

    if (!isMatch) {
        return res.status(400).send({
            error: "Invalid email or password"
        });
    }
    const token = await user.generateAuthToken();
    return res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({message:"Logout Successfull"});
  } catch (e) {
    res.status(500).send();
  }
};
