import { Schema, model } from "mongoose";

const teamsSponsorSchema = Schema(
  {
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Team is required"],
    },
    sponsorId: {
      type: Schema.Types.ObjectId,
      ref: "Sponsor",
      required: [true, "Team is required"],
    },
  },
  { timestamps: true }
);

teamsSponsorSchema.index({ teamId: 1, sponsorId: 1 }, { unique: true });

export default model("TeamSponsor", teamsSponsorSchema);
