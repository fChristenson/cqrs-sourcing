const EventDispatch = require("./EventDispatchModel");
const { BidEventModel } = require("../bids/events");

class EventDispatchService {
  findLastDispatchEvent() {
    return EventDispatch.findOne({}).sort({ createdAt: "desc" });
  }

  storeLatestDispatch(lastEvent) {
    if (lastEvent) {
      new EventDispatch({ createdAt: lastEvent.createdAt }).save();
    }
  }

  findUnsentBidEvents(dispatch) {
    if (dispatch) {
      return BidEventModel.find({ createdAt: { $gt: dispatch.createdAt } });
    } else {
      return BidEventModel.find({});
    }
  }
}

module.exports = EventDispatchService;
