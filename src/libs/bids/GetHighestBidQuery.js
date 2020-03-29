const BidModel = require("./BidModel");

class GetHighestBidQuery {
  run() {
    return BidModel.findOne({}).sort({ createdAt: "desc" });
  }
}

module.exports = GetHighestBidQuery;
