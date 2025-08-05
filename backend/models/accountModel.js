import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const accountSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  name: { 
    type: String, 
    required: true 
  },
  accountType: {
    type: String,
    enum: ["standard", "multiCurrency"],
    required: true,
    default: "standard",
  },
  currency: {
    type: String,
    required: function () {
      return this.accountType === "standard";
    },
  },
  balance: {
    type: Schema.Types.Decimal128,
    default: 0.0,
    required: function () {
      return this.accountType === "standard";
    },
  },
  currencies: {
    type: Map,
    of: new Schema(
      {
        balance: { type: Schema.Types.Decimal128, default: 0.0 },
        currency: { type: String, }
      },
      { _id: false }
    ),
    required: function () {
      return this.accountType === "multiCurrency";
    },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update `updatedAt` on each save()
accountSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const Account = mongoose.model("Account", accountSchema);
