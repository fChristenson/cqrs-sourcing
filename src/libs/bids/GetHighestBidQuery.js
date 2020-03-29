const storeService = require("../store");

class GetHighestBidQuery {
  run() {
    return storeService.getHighestBidView();
  }
}

module.exports = GetHighestBidQuery;
