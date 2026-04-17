import { Schema, model } from "mongoose";

const playerSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
      minlength: 2,
      maxlangth: 50,
    },
    role: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
      enum: {
        value: ["teams", "bowler", "all-rounder", "wicket-keeper"],
        message:
          'Role must be : "teams", "bowler", "all-rounder", "wicket-keeper"',
      },
    },

    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Team name is required"],
    },
  },
  { timestamps: true }
);

export default model("Player", playerSchema);
