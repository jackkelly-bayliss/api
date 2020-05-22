const express = require("express");
const app = express();
const request = require("node-fetch")

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (request, response) => {
  response.json({
  "success": "true"
  });
});

app.get("/api/nowplaying/bounce", (request, response) => {
  response.json({
  "success": "true"
  });
});


const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
