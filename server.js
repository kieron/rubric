const express = require("express");
const serveStatic = require("serve-static");
var history = require("connect-history-api-fallback");

let app = express();
app.use(history(), serveStatic(__dirname + "/dist"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
