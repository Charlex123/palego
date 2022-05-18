import mongoose from "mongoose";
import Schema from "mongoose";
const ObjectIdd = Schema.Types.ObjectId;
const referralSchema = new mongoose.Schema(
  {
    sponsorId: {
      type: String,
      required: true
    },
    userId: {
      type: {ObjectIdd},
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
