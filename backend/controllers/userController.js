import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Referral from "../models/referralModel.js";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {v4 as uuidv4} from "uuid";
import sgTransport from "nodemailer-sendgrid-transport";
dotenv.config();


// async..await is not allowed in global scope, must use a wrapper
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL, // generated ethereal user
      pass: process.env.AUTH_PASS, // generated ethereal password
    }
  });

  // var options = {
  //   auth: {
  //     api_user: process.env.AUTH_USRER,
  //     api_key: process.env.AUTH_PASS
  //   }
  // }
  
  // var client = nodemailer.createTransport(sgTransport(options));
  
  // var email = {
  //   from: 'awesome@bar.com',
  //   to: 'mr.walrus@foo.com',
  //   subject: 'Hello',
  //   text: 'Hello world',
  //   html: '<b>Hello world</b>'
  // };
  
  // client.sendMail(email, function(err, info){
  //     if (err ){
  //       console.log(err);
  //     }
  //     else {
  //       console.log('Message sent: ' + info.response);
  //     }
  // });

  transporter.verify((error, success) => {
    if(error) {
     console.log(error) 
    }else {
      console.log("ready for message");
      console.log(success);
    }
  })

  // send mail with defined transport object
  // let info = await transporter.sendMail({
    // from: '"Fred Foo 👻" <foo@example.com>', // sender address
    // to: "bar@example.com, baz@example.com", // list of receivers
    // subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    // html: "<b>Hello world?</b>", // html body
  // });



//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const getdirectreferrals = await Referral.find(user._id).populate({
      path:"sponsorId", select:['username','_id','email']
    });
    console.log(getdirectreferrals)

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
      const userId = user._id;
      console.log(userId)
      const ref = await Referral.create({
        sponsorId,userId
      });
      
      const getdirectreferrals = await Referral.find(user._id).populate({
        path:"sponsorId", select:['username','_id','email']
      });
      console.log(getdirectreferrals)
      if(ref) {
        const getsponsor = await User.findById(mongoose.Types.ObjectId(sponsorId));
        
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          sponsorId: ref.sponsorId,
          sponsor: getsponsor.username,
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
