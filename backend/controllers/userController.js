import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Referral from "../models/referralModel.js";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {v4 as uuidv4} from "uuid";

dotenv.config();

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
    emailcode: uuidv4(),
    pic,
  });

  if (user) {

    const sponsorId = req.body.sponsorId;
    if(sponsorId) {

      const { sponsorId } = req.body;
    
      const ref = await Referral.create({
        sponsorId
      });
    
      if(ref) {
        const sponsor = await User.findById(mongoose.Types.ObjectId(sponsorId));
        console.log(sponsor.username)
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          sponsorId: ref.sponsorId,
          sponsor: sponsor.username,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: generateToken(user._id),
        });
      }
      
      
    }else {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    }
    
    
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});


// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export { authUser, updateUserProfile, registerUser };
