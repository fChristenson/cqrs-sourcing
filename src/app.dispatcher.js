const mongoose = require("mongoose");
const amq = require("amqplib");
const EventDispatchService = require("./libs/events/EventDispatchService");
const { bidQueue } = require("./libs/events/configs");
const BidDispatchEvent = require("./libs/events/BidDispatchEvent");
const eventDispatchService = new EventDispatchService();

(async () => {
  let conn;
  let channel;
  let mongo;

  const run = async () => {
    if (!conn) {
      conn = await amq.connect(process.env.MQ_URI || "amqp://localhost")
      channel = await conn.createChannel();
    }

    if (!mongo) {
      mongo = await mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/app", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }

    const dispatch = await eventDispatchService.findLastDispatchEvent();
    const bidEvents = await eventDispatchService.findUnsentBidEvents(dispatch);

    console.log("New events found: ", bidEvents.length);
    console.log("--------------------------");

    for (const event of bidEvents) {
      channel.assertQueue(bidQueue, {
        durable: false
      });

      const msg = JSON.stringify(BidDispatchEvent(Object.assign({}, { createdAt: event.createdAt, ...event.eventData })));
      channel.sendToQueue(bidQueue, Buffer.from(msg));
      console.log("Sent message: ", msg);
      console.log("--------------------------");
    }

    const lastEvent = bidEvents[bidEvents.length - 1];
    await eventDispatchService.storeLatestDispatch(lastEvent);
  };

  setInterval(async () => {
    console.log("Running dispatcher");
    console.log("--------------------------");
    try {
      await run();
    } catch (e) {
      console.log(e.message)
    }
  }, 5_000)

})();
