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
  res.json({ success: false });
});

app.get("/api/nowplaying/:radio", async (req, res) => {
  const { radio: radioname } = req.params;
  const radio = APIs[radioname.toLowerCase().trim()];
  if (!radio) return res.status(404).json({
    success: false,
    error: {
      code: 404,
      text: 'Not found',
      full: 'The radio you requested for could not be found.'
    }
  });
  if (radio.type == 'AzuraCast') {
    try {
      const { body } = await snek.get(radio.endpoint);
      const {
        station: {
          listen_url: stream
        },
        listeners: {
          unique: listeners
        },
        live: {
          is_live: live,
          streamer_name: dj
        },
        now_playing: np,
        now_playing: {
          song
        },
        song_history: history
      } = body;
      res.json({
        success: true,
        data: {
          stream,
          listeners,
          dj: live ? `DJ ${dj}` : 'Auto DJ',
          song: {
            name: song.title,
            artist: song.artist,
            album: song.album,
            art: song.art
          },
          history: history.slice(0, 5).map((item) => {
            const { song } = item;
            return {
              name: song.title,
              artist: song.artist,
              album: song.album,
              art: song.art
            };
          })
        }
      });
    } catch(err) {
      res.status(500).json({
        success: 'false',
        error: {
          code: 500,
          text: 'Internal server error',
          full: 'An error occurred whilst fetching from the API'
        }
      });
    };
  } else {
    if (radio.type == 'Bounce') {
      const { body } = await snek.get(radio.endpoint);
      let {
        listeners: {
          total: listeners
        },
        presenter: {
          name: dj
        },
        song
      } = body;
      res.json({
        success: true,
        data: {
          stream: 'https://live.boun.cc',
          listeners,
          dj: dj == 'Bounce' ? 'Auto DJ' : `DJ ${dj}`,
          song: {
            name: song.track,
            artist: song.artist,
            album: song.album_name,
            art: song.cover
          }
        }
      });
    } else
    res.status(500).json({
      success: false,
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
