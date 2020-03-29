const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BidSchema = new Schema({
  bid: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bid", BidSchema);
