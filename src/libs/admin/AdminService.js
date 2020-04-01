const BidModel = require("./BidModel");

class AdminService {
  addHighBid(bidEvent) {
    if (bidEvent.amount > 10_000) {
      console.log("Adding high bid", bidEvent.amount);
      console.log("--------------------------");
      return new BidModel({
        bidId: bidEvent.id,
        amount: bidEvent.amount,
        currency: bidEvent.currency
      }).save();
    } else {
      console.log("Bid too small to be a high bid");
      console.log("--------------------------");
      return Promise.resolve();
    }
  }

  getHighBids() {
    return BidModel.find({});
  }
}

module.exports = AdminService;
