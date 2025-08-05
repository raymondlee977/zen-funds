import mongoose from "mongoose";

const { Schema } = mongoose;

const accountGroupSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  name: { type: String, required: true },
  icon: { type: String, default: "bank" },
  color: { type: String, default: "#00AEEF" },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

accountGroupSchema.pre("save", function (next) {
  this.updatedAt = Date.now(); // …and bumped on every save()
  next();
});

export const AccountGroup = mongoose.model("AccountGroup", accountGroupSchema);
