const BidViewModel = require("../bids/BidViewModel");
const { BidEventModel } = require("../bids/events");

class StoreService {
  constructor(reducers) {
    this.reducers = reducers;
  }

  async store(events) {
    for (const event of events) {
      await BidEventModel({ eventData: event }).save();
      const viewInDb = await BidViewModel.findOne({ id: event.id });

      if (viewInDb) {
        const acc = {
          id: viewInDb.id,
          amount: viewInDb.amount,
          currency: viewInDb.currency,
          createdAt: viewInDb.createdAt
        };
        const view = this.reducers.reduce((view, reducer) => reducer(event, view), acc);
        viewInDb.id = view.id;
        viewInDb.amount = view.amount;
        viewInDb.currency = view.currency;
        viewInDb.createdAt = view.createdAt;

        await viewInDb.save();

      } else {
        const view = this.reducers.reduce((view, reducer) => reducer(event, view), {});
        await new BidViewModel(view).save();
      }
    }

    const lastEvent = events[events.length - 1];
    const endView = await BidViewModel.findOne({ id: lastEvent.id });

    return endView;
  }

  getHighestBidView() {
    return BidViewModel.findOne({}).sort({ "amount": "desc" });
  }
}

module.exports = StoreService;
