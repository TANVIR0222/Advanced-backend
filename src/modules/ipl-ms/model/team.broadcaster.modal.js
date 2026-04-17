import { Schema, model } from "mongoose";

const teamBroadcasterSchema = Schema(
  {
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Team is required"],
    },
    broadCasterId: {
      type: Schema.Types.ObjectId,
      ref: "BroadCaster",
      required: [true, "Team is required"],
    },
  },
  { timestamps: true }
);

teamBroadcasterSchema.index({ teamId: 1, sponsorId: 1 }, { unique: true });

export default model("TeamSponsor", teamBroadcasterSchema);
