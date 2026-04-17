import { Schema, model } from "mongoose";

const sponsorSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "sponsor name is required"],
      trim: true,
      minlength: 2,
      maxlangth: 50,
    },
  },
  { timestamps: true }
);

export default model("sponsor", sponsorSchema);
