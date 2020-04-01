const express = require("express");
const app = express();
const amq = require("amqplib/callback_api");
const { bidQueue } = require("./libs/events/configs");
const AdminService = require("./libs/admin/AdminService");

const adminService = new AdminService();

app.use(express.json());

app.get("/getHighBids", async (req, res) => {
  const bids = adminService.getHighBids();
  res.json(bids);
});

module.exports = app;

(async () => {
  let channel;

  const init = async () => {
    return new Promise((resolve, reject) => {
      amq.connect(process.env.MQ_URI || "amqp://localhost", (e1, conn) => {
        if (e1) return reject(e1);

        conn.createChannel((e2, channel) => {
          if (e2) return reject(e2);

          return resolve(channel);
        });
      });
    })
  }

  const run = (channel) => {
    console.log("Listener running");
    console.log("--------------------------");
    channel.assertQueue(bidQueue, {
      durable: false
    });

    channel.consume(bidQueue, function (msg) {
      console.log(" [x] Received %s", msg.content.toString());
      adminService.addHighBid(JSON.parse(msg.content.toString()))
    }, {
      noAck: true
    });
  }

  const interval = setInterval(async () => {
    console.log("Starting listener");
    console.log("--------------------------");

    if (!channel) {
      try {
        channel = await init();
      } catch (e) {
        console.log(e.message);
      }
    } else {
      clearInterval(interval);
      await run(channel);
    }
  }, 5_000);

})();
