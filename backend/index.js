const express = require("express");
const router = require("./routes/task.router.js");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./db/connectDb.js");

const app = express();
const PORT = process.env.PORT || 8800;

app.get('/', (req, res) => {
  res.send('Hello from the server');
});
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use("/task", router);
app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`);
});
