import mongoose from "mongoose";
import Schema from "mongoose";

const userSchema = new mongoose.Schema(
  {
    sponsorId: {
      type: String,
      required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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

const Referral = mongoose.model("referrals", userSchema);

export default Referral;
