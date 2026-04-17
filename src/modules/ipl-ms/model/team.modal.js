import { Schema, model } from "mongoose";

const teamsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
      minlength: 2,
      maxlangth: 50,
    },

    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
      required: [true, "Owner name is required"],
    },
  },
  { timestamps: true }
);

export default model("Team", teamsSchema);
