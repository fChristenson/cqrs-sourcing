const BidModel = require("./BidModel");

class CreateBidCommand {
  constructor(bid) {
    this.bid = bid;
  }

  run() {
    return new BidModel({ bid: this.bid }).save();
  }
}

module.exports = CreateBidCommand;
