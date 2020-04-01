const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventDispatchSchema = new Schema({
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("EventDispatch", EventDispatchSchema);
