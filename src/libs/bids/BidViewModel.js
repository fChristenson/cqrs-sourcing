const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BidViewSchema = new Schema({
  id: String,
  amount: Number,
  currency: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BidView", BidViewSchema);
