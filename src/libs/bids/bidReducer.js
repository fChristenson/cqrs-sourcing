const { evenTypes } = require("./events");

module.exports = (event, view) => {
  switch (event.type) {
    case evenTypes.createBid:
      return {
        id: event.id,
        amount: event.amount,
        currency: event.currency
      };

    default:
      return view;
  }
}
