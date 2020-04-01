const app = require("./src/app.admin");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Running server on port:", port);
  console.log("--------------------------");
});

