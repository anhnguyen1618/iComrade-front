const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');


const target = process.env.PROXY_TARGET || 'https://icomrade.herokuapp.com/'

var wsProxy = proxy('/', {
  target,
  changeOrigin: true,                     // for vhosted sites, changes host header to match to target's host
  ws: true                               // enable websocket proxy
})

const app = express();

const renderIndex = (req, res) => res.sendFile(path.join(__dirname + '/index.html'));

// React route
app.get('/', renderIndex)
app.get('/dashboard', renderIndex)

// Static route
app.use('/public', express.static(__dirname + '/public/'))

// API route
app.use('/api', proxy({target, changeOrigin: true}))

// Web socket
app.use(wsProxy)

var server = app.listen(process.env.PORT || 8000)
server.on('upgrade', wsProxy.upgrade)