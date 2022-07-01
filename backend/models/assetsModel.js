import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const assetschema = mongoose.Schema(
  {
    asset: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    assettype: {
      type: String,
      required: true,
    },
    assetaddress: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    profitamount: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
  },
  {
    timestamps: true,
  }
);


const Investment = mongoose.model("assets", assetschema);

export default Investment;
