const express = require("express"),
  bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/hello-node", (req, res) => {
  res.send(JSON.stringify(`Hello ${req.body.name}!`));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
