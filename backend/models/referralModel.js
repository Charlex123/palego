import mongoose from "mongoose";
import Schema from "mongoose";
const referralSchema = new mongoose.Schema(
  {
    sponsorId: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    createdAt : {
        type: Date,
        default: Date.now()
    }
  },
  {
    timestamps: true,
  }
);

const Referral = mongoose.model("referrals", referralSchema);

export default Referral;
