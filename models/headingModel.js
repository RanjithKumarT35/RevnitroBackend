const mongoose = require("mongoose");

const headingSchema = new mongoose.Schema(
  {
    headingName: {
      type: String,
      required: true,
    },
    subHeading: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "Heading",
  }
);

module.exports = mongoose.model("Heading", headingSchema);
