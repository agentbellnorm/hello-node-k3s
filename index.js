const express = require("express"),
  bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const port = 8008;

app.get("/hello-node", (req, res) => {
  res.send("Hello whom it may concern!");
});

app.get("/", (req, res) => {
  res.send("Is it me you're looking for?");
});

app.post("/hello-node", (req, res) => {
  res.send(JSON.stringify(`Hello ${req.body.name}!`));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
