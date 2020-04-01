module.exports = (bid) => {
  return {
    source: "place-bids",
    id: bid.id,
    amount: bid.amount,
    currency: bid.currency,
    createdAt: bid.createdAt
  }
}
