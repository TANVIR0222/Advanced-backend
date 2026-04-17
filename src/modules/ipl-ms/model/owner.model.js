import { Schema, model } from "mongoose";

const ownerSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
      minlength: 2,
      maxlangth: 50,
    },
    company: {
      type: String,
      required: [true, "company name is required"],
      trim: true,
      minlength: 2,
      maxlangth: 50,
    },
  },
  { timestamps: true }
);

export default model("Owner", ownerSchema);
