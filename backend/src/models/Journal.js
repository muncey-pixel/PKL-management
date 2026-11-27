const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    activity: { type: String, required: true },
    description: { type: String, required: true },
    result: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// supaya frontend tetap menerima field "id"
journalSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model("Journal", journalSchema);