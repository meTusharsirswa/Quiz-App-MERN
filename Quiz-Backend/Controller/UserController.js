const express = require("express");
const User = require("../model/User-Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserDetail = async (req, res) => {
  try {
    const { user_name } = req.body;

    const user = new User({ user_name });
    await user.save();

    res.json({
      status: true,
      message: "User Name Saved!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error saving user name",
      error: error.message,
    });
  }
};

const getUserDetail = async(req,res)=>{
  const userDetail = await User.find({});
  res.json({
    status : true,
    message : "Get User Detail !!!",
    data : userDetail
  })
}

module.exports = {
  UserDetail,
  getUserDetail
};
