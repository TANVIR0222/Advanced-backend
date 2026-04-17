import { Schema, model } from "mongoose";

const broadcasterSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Broadcaster name is required"],
      trim: true,
      minlength: 2,
      maxlangth: 50,
    },
  },
  { timestamps: true }
);

export default model("Broadcaster", broadcasterSchema);
