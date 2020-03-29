const bidReducer = require("../bids/bidReducer");
const StoreService = require("./StoreService");

const reducers = [
  bidReducer
];

module.exports = new StoreService(reducers);
