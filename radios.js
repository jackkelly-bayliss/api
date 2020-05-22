module.exports = {
  'risefm': {
    type: 'AzuraCast',
    endpoint: 'https://radio.risefm.net/api/nowplaying/1',
    stream: 'https://radio.risefm.net/radio/8000/radio.mp3'
  },
  'bounce': {
    type: 'Bounce',
    endpoint: 'https://stats.boun.cc/',
    stream: 'https://live.boun.cc'
  },
  'nova': {
    type: 'AzuraCast',
    endpoint: 'https://azuracast.livida.net/api/nowplaying/1',
    stream: 'https://azuracast.livida.net/radio/8000/radio.mp3'
  }
};