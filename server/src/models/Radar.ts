import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;

const RadarSchema = new Schema(
  {
    avatar: {
      type: String,
    },
    companyName: {
      type: String,
      required: true,
    },
    linkToCareersPage: {
      type: String,
      required: true,
    },
    addedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model("Radar", RadarSchema);
