const GetHighestBidQuery = require("./bids/GetHighestBidQuery");
const CreateBidCommand = require("./bids/CreateBidCommand");
const QueryService = require("./tasks/QueryService");
const CommandService = require("./tasks/CommandService");

module.exports = {
  GetHighestBidQuery,
  CreateBidCommand,
  queryService: new QueryService(),
  commandService: new CommandService()
};
