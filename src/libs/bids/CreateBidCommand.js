const storeService = require("../store");
const uuid = require("node-uuid");
const { CreateBid } = require("../bids/events");

class CreateBidCommand {
  constructor(bid) {
    this.bid = bid;
  }

  run() {
    const id = uuid.v4();
    const event = CreateBid(id, this.bid);
    const events = [event];
    return storeService.store(events)
  }
}

module.exports = CreateBidCommand;
