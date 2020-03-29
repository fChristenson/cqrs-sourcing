const express = require("express");
const app = express();
const { GetHighestBidQuery, queryService, CreateBidCommand, commandService } = require("./libs");

app.use(express.json());

app.get("/api/v1/bids", async (req, res) => {
  const q = new GetHighestBidQuery();
  console.log("Getting highest bid");
  console.log("--------------------------");
  const bid = await queryService.runQuery(q);
  res.json(bid);
});

app.post("/api/v1/bids", (req, res) => {
  const bid = { amount: parseFloat(req.body.number), currency: "SEK" };
  const c = new CreateBidCommand(bid);
  // We want to allow maximum throughput so we don't wait for the write to happen before returning a response.
  wait(2000, () => {
    console.log("Placing bid", bid);
    console.log("--------------------------");
    commandService.runCommand(c)
  });

  res.json(bid);
});

module.exports = app;

const wait = (timeout, fn) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, timeout);
  })
};