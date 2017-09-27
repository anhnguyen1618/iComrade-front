const express = require('express');
const proxy = require('http-proxy-middleware');

var wsProxy = proxy('/', {
  target: 'https://icomrade.herokuapp.com/',
  changeOrigin: true,                     // for vhosted sites, changes host header to match to target's host
  ws: true                               // enable websocket proxy
})

const app = express();
app.use('/public', express.static(__dirname + '/public/'))
app.use('/api', proxy({target: 'http://www.example.org/api', changeOrigin: true}))
app.use(wsProxy)

app.get('*', (req, res) => {
	res.send('index.html');
})

var server = app.listen(process.env.PORT || 8000)
server.on('upgrade', wsProxy.upgrade)