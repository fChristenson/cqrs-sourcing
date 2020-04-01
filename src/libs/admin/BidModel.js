const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BidSchema = new Schema({
  bidId: String,
  amount: Number,
  currency: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bid", BidSchema);
