import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const assetschema = mongoose.Schema(
  {
    assettype: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    assetdailyprofitratio: {
      type: String,
      required: true,
    },
    dailyprofit: {
      type: String,
      required: true,
    },
    shortassetaddress: {
      type: String,
      required: true
    },
    assetaddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true
    },
    minassetduration: {
      type: String,
      required: true,
    },
    profitamount: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true
    },
    assetaddtime: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);


const Assets = mongoose.model("assets", assetschema);

export default Assets;
