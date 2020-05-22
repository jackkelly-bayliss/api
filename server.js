const express = require("express");
const app = express();
const snek = require('snekfetch');
const APIs = require('./radios.js');

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (req, res) => {
  res.json({
    success: "true"
  });
});

app.get("/api/nowplaying", (req, res) => {
  res.json
})

app.get("/api/nowplaying/:radio", async (req, res) => {
  const { radio: radioname } = req.params;
  const radio = APIs[radio.toLowerCase().trim()];
  if (!radio) return res.status(404).json({
    success: 'false',
    error: {
      code: 404,
      text: 'Not found',
      full: 'The radio you requested for could not be found.'
    }
  });
  if (radio.azuracast) {
    try {
    const { body } = await snek.get(radio.endpoint);
    } catch(err) {
      res.status(500).json({
        success: 'false',
        error: {
          code: 500,
          text: 'Internal server error',
          
        }
      });
    };
  } else {
    res.status(500).json({
      success: 'false',
      error: {
        code: 500,
        text: 'Internal server error',
        full: 'oi this hasn\'t been finished yet you impatient little shi--'
      }
    });
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
