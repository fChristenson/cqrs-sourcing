const { BidEventModel } = require("./libs/bids/events");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const EventDispatchSchema = new Schema({
  createdAt: { type: Date, default: Date.now }
});

const EventDispatch = mongoose.model("EventDispatch", EventDispatchSchema);

const run = async () => {
  const dispatch = await EventDispatch.findOne({}).sort({ createdAt: "desc" });
  let bidEvents = [];

  if (dispatch) {
    bidEvents = await BidEventModel.find({ createdAt: { $gt: dispatch.createdAt } });
  } else {
    bidEvents = await BidEventModel.find({});
  }

  console.log("New events found: ", bidEvents.length);
  console.log("--------------------------");

  for (const event of bidEvents) {
    //TODO: send to queue
    console.log("Event sent: ", event.id);
    console.log("--------------------------");
  }

  const lastEvent = bidEvents[bidEvents.length - 1];

  if (lastEvent) {
    await new EventDispatch({ createdAt: lastEvent.createdAt }).save();
    return mongoose.disconnect();
  } else {
    return mongoose.disconnect();
  }
};

setInterval(async () => {
  console.log("Running dispatch");
  console.log("--------------------------");
  await run();
}, 5_000)
