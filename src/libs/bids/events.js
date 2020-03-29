const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BidEventSchema = new Schema({
  eventData: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports.BidEventModel = mongoose.model("BidEvent", BidEventSchema);

const evenTypes = {
  createBid: "CreateBid"
};

module.exports.evenTypes = evenTypes;

module.exports.CreateBid = (id, bid) => {
  return {
    type: evenTypes.createBid,
    id,
    amount: bid.amount,
    currency: bid.currency
  }
}
